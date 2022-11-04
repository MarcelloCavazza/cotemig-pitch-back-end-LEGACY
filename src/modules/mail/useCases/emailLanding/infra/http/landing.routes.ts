import { Router } from "express";
import * as dotenv from "dotenv";
import { transporter } from "../../../../../../shared/http/middleware/mailer/mailer";

dotenv.config();

const mailOpinion = Router();

mailOpinion.post("/opinion", async (req, res) => {
  const { inputName, inputEmail, inputTitle, inputText } = req.body;

  await transporter
    .sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CTT_EMAIL,
      subject: inputTitle,
      text: `Nome do cliente: ${inputName} Email do cliente: ${inputEmail} Texto do cliente ${inputText}`,
      html: `<b>Nome do cliente:</b> ${inputName}<br><b>Email do cliente:</b> ${inputEmail}<br><b>Texto do cliente:</b> ${inputText}`,
    })
    .then((e) => {
      return res.json(e);
    });
});
export default mailOpinion;
