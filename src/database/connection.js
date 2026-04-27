// src/database/connection.js
import mysql from "mysql2/promise";
import { env } from "../config/env.js";
import { logger } from "../config/logger.js";

let pool;
let poolNew;

export const initMySQL = () => {
    pool = mysql.createPool({
        host: env.db.host,
        user: env.db.user,
        password: env.db.password,
        database: env.db.database,
        port: env.db.port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    poolNew = mysql.createPool({
        host: env.dbNew.host,
        user: env.dbNew.user,
        password: env.dbNew.password,
        database: env.dbNew.database,
        port: env.dbNew.port,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    logger.info("✓ Pools MySQL2 (Principal y Nuevo) inicializados correctamente.");
};

export const getConnection = async () => {
    if (!pool) initMySQL();
    return await pool.getConnection();
};

export const getConnectionNew = async () => {
    if (!poolNew) initMySQL();
    return await poolNew.getConnection();
};

export const query = async (sql, params = []) => {
    if (!pool) initMySQL();
    const [rows] = await pool.query(sql, params);
    return rows;
};

export const queryNew = async (sql, params = []) => {
    if (!poolNew) initMySQL();
    const [rows] = await poolNew.query(sql, params);
    return rows;
};

export const testConnection = async () => {
    try {
        if (!pool || !poolNew) initMySQL();
        
        // Probar conexión principal
        const conn1 = await pool.getConnection();
        await conn1.query("SELECT 1");
        conn1.release();
        logger.info("✓ Conexión exitosa a la base de datos Principal.");

        // Probar conexión nueva
        const conn2 = await poolNew.getConnection();
        await conn2.query("SELECT 1");
        conn2.release();
        logger.info("✓ Conexión exitosa a la base de datos Nueva.");

        return true;
    } catch (error) {
        logger.error("✖ Error al conectar a una de las bases de datos:", error);
        throw error;
    }
};
