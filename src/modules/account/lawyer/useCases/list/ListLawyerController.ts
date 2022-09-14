import { Request, Response } from "express";
import { ListLawyerUseCase } from "./ListLawyerUseCase";

export class ListLawyerController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listLawyerUseCase = new ListLawyerUseCase();
    const lawyer = await listLawyerUseCase.listById(id);
    return response.status(200).json(lawyer);
  }
}
