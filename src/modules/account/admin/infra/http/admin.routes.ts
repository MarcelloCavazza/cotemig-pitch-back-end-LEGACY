import { Router } from "express";
import { CreateAdminController } from "../../useCases/create/CreateAdminController";
import { ListAdminController } from "../../useCases/list/ListAdminController";
import { UpdateAdminController } from "../../useCases/update/UpdateAdminController";

const admin = Router();

admin.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const createController = new CreateAdminController();
const listController = new ListAdminController();
const updateController = new UpdateAdminController();

admin.post("/create", createController.create);
admin.get("/listby/:id", listController.listById);
admin.patch("/updateby/:id", updateController.updateById);
admin.delete("/deleteby/:id", updateController.deleteById);

export { admin };
