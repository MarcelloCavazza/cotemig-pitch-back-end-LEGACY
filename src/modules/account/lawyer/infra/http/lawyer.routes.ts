import { Router } from "express";
import { checkToken } from "../../../../../shared/http/middleware/auth/auth";
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
lawyer.get("/listby/:id", checkToken, listController.listById);
lawyer.patch("/updateby/:id", checkToken, updateController.updateById);
lawyer.delete("/deleteby/:id", checkToken, updateController.deleteById);

export { lawyer };
