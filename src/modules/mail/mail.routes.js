import { Router } from "express";
import { sendRegistrationEmail } from "./mail.controller.js";

const router = Router();

router.post("/send-registration", sendRegistrationEmail);

export default router;
