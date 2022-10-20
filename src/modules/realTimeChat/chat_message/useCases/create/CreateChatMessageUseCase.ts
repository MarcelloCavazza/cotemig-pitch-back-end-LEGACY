import { ChatMessage, STATUS_CHAT } from "../../domain/chat_message";
import { IChat, IRecieveCreateChatData } from "../../dto/ChatMessageDTO";
import { v4 as uuid } from "uuid";
import { ChatMessageRepository } from "../../repositories/ChatMessageRepository";
import { ChatRepository } from "../../../chat/repositories/ChatRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import * as dotenv from "dotenv";
dotenv.config();

export class CreateChatMessageUseCase {
  private chat = new ChatMessage();
  private repositoryChatMessage = new ChatMessageRepository();
  private repositoryChat = new ChatRepository();

  public async create(data: IRecieveCreateChatData): Promise<IChat | String> {
    const { chat_id, message_content, sender_id } = data;
    const chatExists: any = await this.repositoryChat.listById(chat_id);
    if (chatExists) {
      if (
        sender_id == chatExists.clientId ||
        sender_id == chatExists.lawyerId
      ) {
        this.chat.id = uuid();

        Object.assign(this.chat, {
          chat_id,
          message_content,
          sender_id,
          is_active: STATUS_CHAT.ACTIVE,
          created_at: formatDate(new Date().toISOString()),
        });
        try {
          await this.repositoryChatMessage.create(this.chat);
        } catch (error) {
          console.log(error);
          return "erro ao criar o chat";
        }
        return this.chat;
      }
      return "usuario nao pode enviar mensagem ou nao existe";
    }

    return "chat nao existe";
  }
}