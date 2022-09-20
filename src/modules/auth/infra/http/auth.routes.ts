import { Router } from "express";
import { CreateAuthController } from "../../useCases/create/CreateAuthController";
import { ListAuthController } from "../../useCases/list/ListAuthController";
import { UpdateAuthController } from "../../useCases/update/UpdateAuthController";

const auth = Router();

auth.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateAuthController();
const listController = new ListAuthController();
const updateController = new UpdateAuthController();

auth.post("/create", createController.create);
auth.post("/auth/", listController.auth);
auth.get("/listby/:id", listController.listById);
auth.patch("/updateby/:id", updateController.updateById);
auth.delete("/deleteby/:id", updateController.deleteById);

export { auth };
