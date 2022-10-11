import { ChatMessage, STATUS_CHAT } from "../../domain/chat_message";
import { IChat, IRecieveCreateChatData } from "../../dto/ChatMessageDTO";
import { v4 as uuid } from "uuid";
import { ChatMessageRepository } from "../../repositories/ChatMessageRepository";
import { ChatRepository } from "../../../chat/repositories/ChatRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { LawyerRepository } from "../../../../account/lawyer/repositories/LawyerRepository";
import { ClientRepository } from "../../../../account/client/repositories/ClientRepository";
dotenv.config();

export class CreateChatMessageUseCase {
  private chat = new ChatMessage();
  private repositoryChatMessage = new ChatMessageRepository();
  private repositoryChat = new ChatRepository();

  public async create(data: IRecieveCreateChatData): Promise<IChat | String> {
    const { chat_id, message_content, sender_id } = data;
    const chatExists = await this.repositoryChat.listById(chat_id);
    if (chatExists) {
      this.chat.id = uuid();

      Object.assign(this.chat, {
        chat_id,
        message_content,
        sender_id,
        is_active: STATUS_CHAT.ACTIVE,
        created_at: formatDate(new Date().toISOString()),
      });
      console.log(this.chat);
      try {
        await this.repositoryChatMessage.create(this.chat);
      } catch (error) {
        console.log(error);
        return "erro ao criar o chat";
      }

      return this.chat;
    }

    return "conta nao existe";
  }
}
