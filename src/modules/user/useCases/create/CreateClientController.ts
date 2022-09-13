import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, telephone } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.create({
      name,
      cpf,
      email,
      password,
      telephone,
    });
    return response.status(200).json(user);
  }
}
