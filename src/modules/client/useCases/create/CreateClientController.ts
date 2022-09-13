import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, telephone } = request.body;

    const createClientUseCase = new CreateClientUseCase();
    const client = await createClientUseCase.create({
      name,
      cpf,
      email,
      password,
      telephone,
    });
    return response.status(200).json(client);
  }
}
