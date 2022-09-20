import { Request, Response } from "express";
import { CreateAuthUseCase } from "./CreateAuthUseCase";

export class CreateAuthController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createAuthUseCase = new CreateAuthUseCase();
    const admin = await createAuthUseCase.create({
      email,
      password,
    });
    return response.status(200).json(admin);
  }
}
