import { Request, Response } from "express";
import { CreateChatUseCase } from "./CreateChatUseCase";

export class CreateChatController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { room_name, clientId, lawyerId } = request.body;

    const createAuthUseCase = new CreateChatUseCase();
    const chat = await createAuthUseCase.create({
      room_name,
      clientId,
      lawyerId,
    });
    return response.json(chat);
  }
}
