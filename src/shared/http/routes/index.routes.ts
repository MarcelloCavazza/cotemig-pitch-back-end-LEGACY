import { Router } from "express";
import { client } from "../../../modules/account/client/infra/http/client.routes";
import { lawyer } from "../../../modules/account/lawyer/infra/http/lawyer.routes";
import { admin } from "../../../modules/account/admin/infra/http/admin.routes";

const routes = Router();

routes.get("/status", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

routes.use("/client", client);
routes.use("/lawyer", lawyer);
routes.use("/admin", admin);

export { routes };
