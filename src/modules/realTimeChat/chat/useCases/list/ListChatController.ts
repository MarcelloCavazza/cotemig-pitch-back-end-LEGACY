import { Request, Response } from "express";
import { ListChatUseCase } from "./ListChatUseCase";

export class ListChatController {
  public async listById(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.listById(id);
    return response.json(chat);
  }

  public async listbyclient(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.listbyclient(id);
    return response.json(chat);
  }
  public async listbylawyer(request: Request, response: Response) {
    const { id } = request.params;

    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.listbylawyer(id);
    return response.json(chat);
  }

  public async findRoomByName(request: Request, response: Response) {
    const { name } = request.params;
    const listChatUseCase = new ListChatUseCase();
    const chat = await listChatUseCase.findRoomByName(name);
    return response.json(chat);
  }
}
