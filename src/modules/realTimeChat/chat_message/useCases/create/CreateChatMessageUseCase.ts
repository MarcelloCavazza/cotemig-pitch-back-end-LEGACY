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
  private chatExists = false;

  public async create(data: IRecieveCreateChatData): Promise<IChat | String> {
    const { chat_id, message_content, sender_id } = data;
    console.log(chat_id)
    try{
      Object.assign(this.chat, {
        id: uuid(),
        chat_id: chat_id,
        message_content: message_content,
        sender_id: sender_id,
        is_active: STATUS_CHAT.ACTIVE,
        created_at: formatDate(new Date().toISOString()),
      });
      await this.repositoryChatMessage.create(this.chat);
      this.chatExists = true;
    } catch(e){
      console.log(e)
    }
    /*this.repositoryChat.listById(chat_id).then(async function (result: any){
      //if (sender_id == result.clientId || sender_id == result.lawyerId) {
        console.log(this.chatExists);
        //this.chat.id = uuid();
        Object.assign(this.chat, {
          id: uuid(),
          chat_id,
          message_content,
          sender_id,
          is_active: STATUS_CHAT.ACTIVE,
          created_at: formatDate(new Date().toISOString()),
        });
        console.log(this.chat)
        try {
          await this.repositoryChatMessage.create(this.chat);
        } catch (error) {
          console.log(error);
          return
        }
        this.chatExists = true;
      //}
    });*/

    return this.chatExists ? this.chat : "chat nao existe";
  }
}
