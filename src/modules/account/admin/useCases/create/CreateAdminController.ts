import { Request, Response } from "express";
import { CreateAdminUseCase } from "./CreateAdminUseCase";

export class CreateAdminController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdminUseCase = new CreateAdminUseCase();
    const admin = await createAdminUseCase.create({
      name,
      email,
      password,
    });
    return response.json(admin);
  }
}
