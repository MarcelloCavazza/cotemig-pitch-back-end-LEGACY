import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Chat } from "../../domain/chat";
import { ChatRepository } from "../../repositories/ChatRepository";
export class ListChatUseCase {
  private repository = new ChatRepository();

  public async listById(id: string): Promise<Chat | boolean> {
    try {
      const chat = await this.repository.listById(id);
      return chat;
    } catch (error) {
      new AppError(error);
    }
  }

  public async findRoomByName(name: string): Promise<Chat | boolean> {
    try {
      const chat = await this.repository.findRoomByName(name);
      return chat;
    } catch (error) {
      new AppError(error);
    }
  }

  public async listbyclient(id: string): Promise<Chat | boolean> {
    try {
      const chat = await this.repository.listbyclient(id);
      return chat;
    } catch (error) {
      new AppError(error);
    }
  }

  public async listbylawyer(id: string): Promise<Chat | boolean> {
    try {
      const chat = await this.repository.listbylawyer(id);
      return chat;
    } catch (error) {
      return false;
    }
  }
}
