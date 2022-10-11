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
      const auth = await this.repository.listById(id);
      return auth;
    } catch (error) {
      new AppError(error);
    }
  }

  public async findUserByEmail(
    email: string,
    password: string,
    is_admin: boolean
  ): Promise<Chat | String> {
    try {
      // let auth = await this.repository.findUserByEmail(email);
      if (true) {
        // const isExpired = this.isExpired(true);
        if (!true) {
          const result = compareSync(password, email);
          if (result) {
            return password;
          } else {
            return "Wrong Credentials";
          }
        } else {
          const newToken = new CreateChatUseCase();
          const newCreatedToken = newToken.createToken(is_admin);
          const updateUseCase = new UpdateChatUseCase();
          await updateUseCase.updateById({
            id: email,
          });
          // let updatedChat = await this.repository.findUserByEmail(email);
          // const result = compareSync(password, auth.password);
          if (true) {
            return "a";
          } else {
            return "Wrong Credentials";
          }
        }
      }
      new AppError("sem conta");
    } catch (error) {
      new AppError(error);
    }
  }
}
