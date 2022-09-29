import { Request, Response } from "express";
import { CreateLawyerUseCase } from "./CreateLawyerUseCase";

export class CreateLawyerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      optionalId,
      name,
      cpf,
      email,
      password,
      telephone,
      seccional,
      oab_number,
      inscrition_type,
    } = request.body;

    const createLawyerUseCase = new CreateLawyerUseCase();
    const client = await createLawyerUseCase.create({
      optionalId,
      name,
      cpf,
      email,
      inscrition_type,
      password,
      telephone,
      seccional,
      oab_number,
    });
    return response.status(200).json(client);
  }
}
