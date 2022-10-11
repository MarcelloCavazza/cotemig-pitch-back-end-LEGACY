import { Router } from "express";
import { CreateChatMessageController } from "../../useCases/create/CreateChatMessageController";
import { ListChatMessageController } from "../../useCases/list/ListChatMessageController";

const chat_message = Router();

chat_message.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateChatMessageController();
const listController = new ListChatMessageController();

chat_message.post("/create", createController.create);
chat_message.get("/listbychatid/:id", listController.listbychatid);

export { chat_message };
