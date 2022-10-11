import { Request, Response } from "express";
import { UpdateAuthUseCase } from "./UpdateAuthUseCase";

export class UpdateAuthController {
  public async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { is_active, email, password, token } = request.body;
    const updateUseCase = new UpdateAuthUseCase();

    await updateUseCase.updateById({
      id,
      token,
      is_active,
      email,
      password,
    });

    return response.json("Auth updated");
  }
  public async deleteById(request: Request, response: Response) {
    const { id } = request.params;
    const updateUseCase = new UpdateAuthUseCase();

    await updateUseCase.deleteById(id);

    return response.json("Auth deleted");
  }
}
