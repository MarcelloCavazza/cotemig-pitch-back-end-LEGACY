import { Router } from "express";
import * as dotenv from "dotenv";
import { transporter } from "../../../../../../shared/http/middleware/mailer/mailer";
dotenv.config();

const mailReset = Router();

mailReset.post("/send", async (req, res) => {
  const { userMail } = req.body;
  await transporter
    .sendMail({
      from: process.env.GMAIL_USER,
      to: userMail,
      subject: "Email para reset de senha - CTT",
      text: "Segue o link para resetar a senha",
      html: "<b>Segue o link para resetar a  <a href='http://localhost:3000/resestar-senha'>senha</a></b>",
    })
    .then((e) => {
      return res.json(e);
    });
});

export default mailReset;
