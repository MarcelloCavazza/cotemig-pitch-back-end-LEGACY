import { Router } from "express";
import { client } from "../../../modules/client/infra/http/client.routes";
import { lawyer } from "../../../modules/lawyer/infra/http/lawyer.routes";

const routes = Router();

routes.get("/status", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

routes.use("/client", client);
routes.use("/lawyer", lawyer);

export { routes };
