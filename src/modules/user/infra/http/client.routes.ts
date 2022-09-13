import { Router } from "express";
import { CreateClientController } from "../../useCases/create/CreateClientController";

const client = Router();

client.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateClientController();

client.post("/create", createController.create);

export { client };
