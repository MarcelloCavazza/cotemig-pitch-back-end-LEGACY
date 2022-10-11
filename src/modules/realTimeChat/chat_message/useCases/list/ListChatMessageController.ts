import { Request, Response } from "express";
import { ListChatMessageUseCase } from "./ListChatMessageUseCase";

export class ListChatMessageController {
  public async listbychatid(request: Request, response: Response) {
    const { id } = request.params;
    const listChatUseCase = new ListChatMessageUseCase();
    const chat = await listChatUseCase.listbychatid(id);
    return response.json(chat);
  }
}
