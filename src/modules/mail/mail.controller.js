import nodemailer from "nodemailer";
import { getRegistrationTemplate } from "../../utils/mail/template_register.js";
import { logger } from "../../config/logger.js";

export const sendRegistrationEmail = async (req, res, next) => {
  try {
    const registrationData = req.body;

    if (!registrationData.email) {
      return res.status(400).json({
        status: "error",
        message: "El correo electrónico es obligatorio para enviar la notificación."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: parseInt(process.env.EMAIL_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = getRegistrationTemplate(registrationData);

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: `${registrationData.email}, ${process.env.EMAIL_ADMIN}`,
      subject: `Nueva Solicitud de Registro - ${registrationData.fullName}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    
    logger.info(`Email enviado: ${info.messageId}`);

    res.status(200).json({
      status: "success",
      message: "Correo de registro enviado correctamente",
      messageId: info.messageId
    });
  } catch (error) {
    logger.error("Error al enviar el correo:", error);
    next(error);
  }
};
