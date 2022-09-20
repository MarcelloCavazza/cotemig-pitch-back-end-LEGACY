import { Request, Response } from "express";
import { ListAuthUseCase } from "./ListAuthUseCase";

export class ListAuthController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listAuthUseCase = new ListAuthUseCase();
    const admin = await listAuthUseCase.listById(id);
    return response.status(200).json(admin);
  }

  public async auth(request: Request, response: Response) {
    const { email, password } = request.body;

    const listAuthUseCase = new ListAuthUseCase();
    const admin = await listAuthUseCase.findUserByEmail(email, password);
    return response.status(200).json(admin);
  }
}
