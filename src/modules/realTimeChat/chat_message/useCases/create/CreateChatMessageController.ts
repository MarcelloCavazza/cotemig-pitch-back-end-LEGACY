import { Request, Response } from "express";
import { CreateChatMessageUseCase } from "./CreateChatMessageUseCase";

export class CreateChatMessageController {
  public async sendMessage(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { chat_id, message_content, sender_id } = request.body;

    const createChatMessageUseCase = new CreateChatMessageUseCase();
    const chat = await createChatMessageUseCase.create({
      chat_id,
      message_content,
      sender_id,
    });
    return response.json(chat);
  }
}
