import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_CHAT } from "../domain/chat";
import { IChat, IChatUpdate } from "../dto/ChatDTO";
import { ChatEntity } from "../infra/entities/ChatEntity";
import { IChatRespository } from "./IChatRepository";

export class ChatRepository implements IChatRespository {
  private chatRepository = AppDataSource.manager;

  public async create(data: IChat) {
    console.log(
      await this.chatRepository.save(
        this.chatRepository.create(ChatEntity, data)
      )
    );
  }
  public async update(data: IChat): Promise<IChatUpdate | any> {
    const { id, ...params } = data;
    try {
      const result = await this.chatRepository
        .createQueryBuilder()
        .update(ChatEntity)
        .set(params)
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel atualizar");
      }
      return result;
    } catch (error) {
      new AppError(error);
    }
  }
  public async deleteById(id: string): Promise<void> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder()
        .update(ChatEntity)
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
  public async listById(id: string): Promise<IChat> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder(ChatEntity, "auth")
        .where("auth.id = :id", { id })
        .getOne();
      if (!result) {
        new AppError("nao achou");
      }
      return result;
    } catch (error) {
      new AppError(error);
    }
  }
  public async findRoomByName(room_name: string): Promise<IChat | boolean> {
    try {
      const result = await this.chatRepository
        .createQueryBuilder(ChatEntity, "chat")
        .where("chat.room_name = :room_name AND auth.is_active = 'active'", {
          room_name,
        })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      new AppError(error);
    }
  }
}
