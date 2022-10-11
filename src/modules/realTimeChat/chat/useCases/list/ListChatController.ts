import { Request, Response } from "express";
import { ListChatUseCase } from "./ListChatUseCase";

export class ListChatController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const admin = await listChatUseCase.listById(id);
    return response.json(admin);
  }

  public async auth(request: Request, response: Response) {
    const { email, password, is_admin } = request.body;

    const listChatUseCase = new ListChatUseCase();
    const admin = await listChatUseCase.findUserByEmail(
      email,
      password,
      is_admin
    );
    return response.json(admin);
  }
}
