import { Request, Response } from "express";
import { UpdateClientUseCase } from "./UpdateClientUseCase";

export class UpdateClientController {
  public async updateById(request: Request, response: Response) {
    const { id } = request.params;
    const { status, name, cpf, email, password, telephone } = request.body;
    const updateUseCase = new UpdateClientUseCase();

    await updateUseCase.updateById({
      id,
      status,
      name,
      cpf,
      email,
      password,
      telephone,
    });

    return response.status(200).json("User updated");
  }
  public async deleteById(request: Request, response: Response) {
    const { id } = request.params;
    const updateUseCase = new UpdateClientUseCase();

    await updateUseCase.deleteById(id);

    return response.status(200).json("User deleted");
  }
}
