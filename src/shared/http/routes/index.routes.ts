import { Router } from "express";
import { user } from "../../../modules/user/infra/http/user.routes";

const routes = Router();

routes.get("/status", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

routes.use("/user", user);

export { routes };
