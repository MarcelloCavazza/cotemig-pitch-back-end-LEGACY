import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { Auth } from "../../domain/auth";
import { AuthRepository } from "../../repositories/AuthRepository";
import { compareSync } from "bcrypt";
import moment = require("moment");
import { CreateAuthUseCase } from "../create/CreateAuthUseCase";
import { UpdateAuthUseCase } from "../update/UpdateAuthUseCase";

export class ListAuthUseCase {
  private repository = new AuthRepository();

  public async listById(id: string): Promise<Auth> {
    try {
      const auth = await this.repository.listById(id);
      return auth;
    } catch (error) {
      new AppError(error);
    }
  }

  public async findUserByEmail(
    email: string,
    password: string
  ): Promise<Auth | String> {
    try {
      let auth = await this.repository.findUserByEmail(email);
      if (auth) {
        const isExpired = this.isExpired(auth.created_at);
        if (!isExpired) {
          const result = compareSync(password, auth.password);
          if (result) {
            return auth;
          } else {
            return "Wrong Credentials";
          }
        } else {
          const newToken = new CreateAuthUseCase();
          const newCreatedToken = newToken.createToken(email);
          const updateUseCase = new UpdateAuthUseCase();
          await updateUseCase.updateById({
            id: auth.id,
            token: newCreatedToken,
          });
          let updatedAuth = await this.repository.findUserByEmail(email);
          const result = compareSync(password, auth.password);
          if (result) {
            return updatedAuth;
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

  private isExpired(created_at): boolean {
    const today = moment(new Date(), "YYYY-mm-dd").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const expires_in = moment(created_at, "YYYY-mm-dd").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const ms = moment(today).diff(expires_in);
    const duration = moment.duration(moment(today).diff(expires_in)).asHours();
    const validation = parseInt(
      `${Math.floor(duration)}${moment.utc(ms).format("mm")}`
    );

    return validation >= 2400;
  }
}
