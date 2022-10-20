import { Router } from "express";
import { client } from "../../../modules/account/client/infra/http/client.routes";
import { lawyer } from "../../../modules/account/lawyer/infra/http/lawyer.routes";
import { admin } from "../../../modules/account/admin/infra/http/admin.routes";
import { auth } from "../../../modules/auth/infra/http/auth.routes";
import { chat } from "../../../modules/realTimeChat/chat/infra/http/chat.routes";
import { chat_message } from "../../../modules/realTimeChat/chat_message/infra/http/chat_message.routes";
import mailSender from "../../../modules/mail/mail.routes";

const routes = Router();

routes.get("/status", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

routes.use("/client", client);
routes.use("/lawyer", lawyer);
routes.use("/admin", admin);
routes.use("/auth", auth);
routes.use("/chat", chat);
routes.use("/chatmessage", chat_message);
routes.use('/mail', mailSender);

export { routes };
