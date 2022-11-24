import { Chat, STATUS_CHAT } from "../../domain/chat";
import { IChat, IRecieveCreateChatData } from "../../dto/ChatDTO";
import { v4 as uuid } from "uuid";
import { ChatRepository } from "../../repositories/ChatRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { LawyerRepository } from "../../../../../modules/account/lawyer/repositories/LawyerRepository";
import { ClientRepository } from "../../../../../modules/account/client/repositories/ClientRepository";
dotenv.config();

export class CreateChatUseCase {
  private chat = new Chat();
  private repositoryChat = new ChatRepository();
  private repositoryClient = new ClientRepository();
  private repositoryLawyer = new LawyerRepository();

  public async create(data: IRecieveCreateChatData): Promise<IChat | String> {
    const { room_name, clientId, lawyerId } = data;
    const clientExists = await this.repositoryClient.listById(clientId);
    const lawyerExists = await this.repositoryLawyer.listById(lawyerId);

    //if (clientExists && lawyerExists) {
      const roomExists = await this.repositoryChat.findRoomByName(room_name);

      if (!roomExists) {
        this.chat.id = uuid();

        Object.assign(this.chat, {
          clientId,
          lawyerId,
          room_name,
          is_active: STATUS_CHAT.ACTIVE,
          created_at: formatDate(new Date().toISOString()),
        });
        try {
          await this.repositoryChat.create(this.chat);
        } catch (error) {
          console.log(error);
          return "erro ao criar o chat";
        }

        return this.chat;
      }
    //}

    return "conta nao existe";
  }

  public createToken(is_admin: boolean) {
    let secretKey = process.env.SECRET_KEY_USER;
    if (is_admin) {
      secretKey = process.env.SECRET_KEY_ADMIN;
    }
    return sign({}, secretKey, {
      subject: String(this.chat.id),
      expiresIn: String(process.env.EXPIRATION_TIME),
    });
  }
}
