import { Router } from "express";
import { CreateLawyerController } from "../../useCases/create/CreateLawyerController";
import { ListLawyerController } from "../../useCases/list/ListLawyerController";
import { UpdateLawyerController } from "../../useCases/update/UpdateLawyerController";

const createController = new CreateLawyerController();
const listController = new ListLawyerController();
const updateController = new UpdateLawyerController();
const lawyer = Router();

lawyer.get("/status", (req, res) => {
  res.status(200).json({ status: "ok" });
});

lawyer.post("/create", createController.create);
lawyer.get("/listby/:id", listController.listById);
lawyer.patch("/updateby/:id", updateController.updateById);
lawyer.delete("/deleteby/:id", updateController.deleteById);

export { lawyer };
