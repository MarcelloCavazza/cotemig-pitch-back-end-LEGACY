import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_CHAT } from "../domain/chat";
import { IChat, IChatUpdate } from "../dto/ChatDTO";
import { Chat } from "../infra/entities/ChatEntity";
import { IChatRespository } from "./IChatRepository";

export class ChatRepository implements IChatRespository {
  private chatRepository = AppDataSource.manager;

  public async create(data: IChat) {
    await this.chatRepository.save(this.chatRepository.create(Chat, data));
  }
  public async update(data: IChat): Promise<IChatUpdate | any> {
    const { id, ...params } = data;
    try {
      const result = await this.chatRepository
        .createQueryBuilder()
        .update(Chat)
        .set(params)
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel atualizar");
      }
      return result;
    } catch (error) {
      return false;
    }
  }
  public async deleteById(id: string): Promise<void> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder()
        .update(Chat)
        .set({ is_active: STATUS_CHAT.INCATIVE })
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel remover");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async listbyclient(id: string): Promise<IChat | boolean> {
    console.log(id);
    try {
      const result = await this.chatRepository
        .createQueryBuilder(Chat, "chat")
        .where("chat.clientId = :id", { id })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  }
  public async listbylawyer(id: string): Promise<IChat | boolean> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder(Chat, "chat")
        .where("chat.lawyerId = :id", { id })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  }
  public async listById(id: string): Promise<IChat | boolean> {
    console.log(id);
    try {
      const result = await this.chatRepository
        .createQueryBuilder(Chat, "chat")
        .where("chat.id = :id AND chat.is_active = 'active'", { id })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  }
  public async findRoomByName(room_name: string): Promise<IChat | boolean> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder(Chat, "chat")
        .where("chat.room_name = :room_name AND chat.is_active = 'active'", {
          room_name,
        })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  }
}
