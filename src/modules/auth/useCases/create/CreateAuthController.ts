import { Request, Response } from "express";
import { CreateAuthUseCase } from "./CreateAuthUseCase";

export class CreateAuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password, is_admin } = request.body;

    const createAuthUseCase = new CreateAuthUseCase();
    const admin = await createAuthUseCase.create({
      email,
      is_admin,
      password,
    });
    return response.json(admin);
  }
}
