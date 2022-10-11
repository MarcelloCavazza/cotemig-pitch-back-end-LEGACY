import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Chat } from "../../domain/chat";
import { ChatRepository } from "../../repositories/ChatRepository";
import { compareSync } from "bcrypt";
import moment = require("moment");
import { CreateChatUseCase } from "../create/CreateChatUseCase";
import { UpdateChatUseCase } from "../update/UpdateChatUseCase";
import e = require("express");

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
