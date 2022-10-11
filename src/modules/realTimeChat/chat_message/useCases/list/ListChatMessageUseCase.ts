import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { IChat } from "../../dto/ChatMessageDTO";
import { ChatMessageRepository } from "../../repositories/ChatMessageRepository";

export class ListChatMessageUseCase {
  private repository = new ChatMessageRepository();

  public async listbychatid(id: string): Promise<IChat[] | boolean> {
    try {
      const chat = await this.repository.listbychatid(id);
      return chat;
    } catch (error) {
      return false;
    }
  }
}
