import { Router } from "express";
import { checkToken } from "../../../../../shared/http/middleware/auth/auth";
import { CreateClientController } from "../../useCases/create/CreateClientController";
import { ListClientController } from "../../useCases/list/ListClientController";
import { UpdateClientController } from "../../useCases/update/UpdateClientController";

const client = Router();

client.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateClientController();
const listController = new ListClientController();
const updateController = new UpdateClientController();

client.post("/create", checkToken, createController.create);
client.get("/listby/:id", listController.listById);
client.patch("/updateby/:id", checkToken, updateController.updateById);
client.delete("/deleteby/:id", checkToken, updateController.deleteById);

export { client };
