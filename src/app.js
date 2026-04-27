import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./modules/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { testConnection } from "./database/connection.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
    try {
        await testConnection();
        res.json({
            status: "online",
            databases: {
                principal: "connected",
                nuevo: "connected"
            },
            message: "Backend funcionando correctamente",
            time: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: "partial_online",
            databases: {
                message: "Error en una o ambas conexiones",
                error: error.message
            },
            message: "Error al conectar con las bases de datos",
        });
    }
});

// Rutas principales
app.use("/api/v1", routes);

// Middleware de errores
app.use(errorMiddleware);

export default app;
