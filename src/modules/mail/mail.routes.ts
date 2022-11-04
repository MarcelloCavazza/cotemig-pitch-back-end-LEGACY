import { Router } from "express";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import mailOpinion from "./useCases/emailLanding/infra/http/landing.routes";
import mailReset from "./useCases/emailResetPassword/http/infra/resetpassword.routes";
dotenv.config();

const mailSender = Router();

mailSender.post("/resetpassword", mailReset);
mailSender.use("/mailOpinion", mailOpinion);

export default mailSender;
