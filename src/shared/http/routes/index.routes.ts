import { Router } from "express";
import { client } from "../../../modules/client/infra/http/client.routes";

const routes = Router();

routes.get("/status", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

routes.use("/client", client);

export { routes };
