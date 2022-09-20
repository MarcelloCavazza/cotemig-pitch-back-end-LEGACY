import { AppDataSource } from "@shared/database/data-source";
import { AppError } from "@shared/mainError/mainErrorClass";
import { STATUS_AUTH } from "../domain/auth";
import { IAuth, IAuthUpdate } from "../dto/AuthDTO";
import { Auth } from "../infra/entities/AuthEntity";
import { IAuthRespository } from "./IAuthRepository";

export class AuthRepository implements IAuthRespository {
  private authRepository = AppDataSource.manager;

  public async create(data: IAuth) {
    await this.authRepository.save(this.authRepository.create(Auth, data));
  }
  public async update(data: IAuth): Promise<IAuthUpdate | any> {
    const { id, ...params } = data;
    try {
      const result = await this.authRepository
        .createQueryBuilder()
        .update(Auth)
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
      const result = await this.authRepository
        .createQueryBuilder()
        .update(Auth)
        .set({ is_active: STATUS_AUTH.INCATIVE })
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel remover");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async listById(id: string): Promise<IAuth> {
    try {
      const result = await this.authRepository
        .createQueryBuilder(Auth, "auth")
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
  public async findUserByEmail(email: string): Promise<IAuth> {
    try {
      const result = await this.authRepository
        .createQueryBuilder(Auth, "auth")
        .where("auth.email = :email AND auth.is_active = 'active'", {
          email,
        })
        .getOne();
      if (!result) {
        new AppError("nao achou");
      }
      return result;
    } catch (error) {
      new AppError(error);
    }
  }
}
