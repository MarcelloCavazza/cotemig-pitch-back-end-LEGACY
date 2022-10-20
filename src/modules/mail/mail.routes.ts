import { Router } from "express";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const mailSender = Router();

mailSender.get("/send", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter
    .sendMail({
      from: process.env.GMAIL_USER,
      to: "marcellocavazzaoliveira@gmail.com",
      subject: "Email para reset de senha - CTT",
      text: "Segue o link para resetar a senha",
      html: "<b>Segue o link para resetar a  <a href='http://localhost:3000/resestar-senha'>senha</a></b>",
    })
    .then((e) => {
      return res.json(e);
    });
});

export default mailSender;
