import { Router } from "express";
import { client } from "../../../modules/user/infra/http/client.routes";
import { CreateClientController } from "../../../modules/user/useCases/create/CreateClientController";

const routes = Router();

routes.get("/status", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

const createController = new CreateClientController();

routes.use("/client", createController.create);

export { routes };
