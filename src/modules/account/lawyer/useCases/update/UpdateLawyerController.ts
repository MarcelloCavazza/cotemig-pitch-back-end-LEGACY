import { Request, Response } from "express";
import { UpdateLawyerUseCase } from "./UpdateLawyerUseCase";

export class UpdateLawyerController {
  public async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { is_active } = request.body;
    const updateUseCase = new UpdateLawyerUseCase();

    await updateUseCase.updateById({
      id,
      is_active,
    });

    return response.json("Lawyer updated");
  }
  public async deleteById(request: Request, response: Response) {
    const { id } = request.params;
    const updateUseCase = new UpdateLawyerUseCase();

    await updateUseCase.deleteById(id);

    return response.json("Lawyer deleted");
  }
}
