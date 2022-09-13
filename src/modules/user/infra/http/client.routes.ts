import { Router } from "express";
import { CreateClientController } from "../../useCases/create/CreateClientController";
import { ListClientController } from "../../useCases/list/ListClientController";

const client = Router();

client.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateClientController();
const listController = new ListClientController();

client.post("/create", createController.create);
client.get("/listby/:id", listController.listById);

export { client };
