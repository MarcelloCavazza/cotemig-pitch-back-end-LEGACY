import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_CHAT } from "../domain/chat_message";
import { IChat } from "../dto/ChatMessageDTO";
import { ChatMessage } from "../infra/entities/ChatMessageEntity";
import { IChatRespository } from "./IChatMessageRepository";

export class ChatMessageRepository implements IChatRespository {
  private chatRepository = AppDataSource.manager;

  public async create(data: IChat) {
    await this.chatRepository.save(
      this.chatRepository.create(ChatMessage, data)
    );
  }
  public async listbychatid(id: string): Promise<IChat[] | boolean> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder(ChatMessage, "chat_message")
        .where(
          "chat_message.chat_id = :id AND chat_message.is_active = 'active'",
          {
            id,
          }
        )
        .getMany();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  }
}
