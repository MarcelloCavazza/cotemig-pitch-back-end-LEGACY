import { Request, Response } from "express";
import { CreateLawyerUseCase } from "./CreateLawyerUseCase";

export class CreateLawyerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, cpf, email, password, telephone, state, oab_number } =
      request.body;
    console.log(name, cpf, email, password, telephone, state, oab_number);
    const createLawyerUseCase = new CreateLawyerUseCase();
    const client = await createLawyerUseCase.create({
      name,
      cpf,
      email,
      state,
      password,
      telephone,
      oab_number,
    });
    return response.json(client);
  }
}
