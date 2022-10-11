import { Request, Response } from "express";
import { UpdateAdminUseCase } from "./UpdateAdminUseCase";

export class UpdateAdminController {
  public async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { is_active, name, email, password } = request.body;
    const updateUseCase = new UpdateAdminUseCase();

    await updateUseCase.updateById({
      id,
      is_active,
      name,
      email,
      password,
    });

    return response.json("Admin updated");
  }
  public async deleteById(request: Request, response: Response) {
    const { id } = request.params;
    const updateUseCase = new UpdateAdminUseCase();

    await updateUseCase.deleteById(id);

    return response.json("Admin deleted");
  }
}
