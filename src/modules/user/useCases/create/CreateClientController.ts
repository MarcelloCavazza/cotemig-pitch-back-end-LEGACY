import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateClientUseCase";

export class CreateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, telephone, profile } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    const user = await createUserUseCase.create({
      name,
      cpf,
      email,
      password,
      telephone,
    });
    return response.json(user);
  }
}
