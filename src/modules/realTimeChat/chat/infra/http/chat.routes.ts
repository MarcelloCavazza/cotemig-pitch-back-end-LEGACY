import { Router } from "express";
import { CreateChatController } from "../../useCases/create/CreateChatController";
import { ListChatController } from "../../useCases/list/ListChatController";
import { UpdateChatController } from "../../useCases/update/UpdateChatController";

const chat = Router();

chat.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateChatController();
const listController = new ListChatController();
const updateController = new UpdateChatController();

chat.post("/create", createController.create);
chat.get("/listby/:id", listController.listById);
chat.get("/listbyclient/:id", listController.listbyclient);
chat.get("/listbylawyer/:id", listController.listbylawyer);
chat.get("/findRoomByName/:name", listController.findRoomByName);
chat.get("/get_all_rooms", listController.getAllRooms);
chat.delete("/deleteby/:id", updateController.deleteById);

export { chat };
