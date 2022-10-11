import { Request, Response } from "express";
import { CreateChatMessageUseCase } from "./CreateChatMessageUseCase";

export class CreateChatMessageController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { chat_id, message_content, sender_id } = request.body;

    const createAuthUseCase = new CreateChatMessageUseCase();
    const chat = await createAuthUseCase.create({
      chat_id,
      message_content,
      sender_id,
    });
    return response.json(chat);
  }
}
