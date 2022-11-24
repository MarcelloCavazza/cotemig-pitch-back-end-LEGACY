import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_CLIENT } from "../domain/Client";
import { IClient } from "../dto/ClientDTO";
import { User } from "../infra/entities/ClientEntity";
import { IClientRespository } from "./IClientRepository";

export class ClientRepository implements IClientRespository {
  private clientRepository = AppDataSource.manager;

  public async create(data: IClient) {
    await this.clientRepository.save(this.clientRepository.create(User, data));
  }
  public async update(data: IClient): Promise<void> {
    const { id, ...params } = data;
    try {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(User)
        .set(params)
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel atualizar");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async deleteById(id: string): Promise<void> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(User)
        .set({ is_active: STATUS_CLIENT.INCATIVE })
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel remover");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async listById(id: string): Promise<IClient | boolean> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder(User, "user")
        .where("user.id = :id AND user.is_active = 'active'", { id })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      new AppError(error);
    }
  }
  public async findUserByEmail(email: string): Promise<IClient> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder(User, "user")
        .where("user.email = :email AND user.is_active = 'active'", {
          email,
        })
        .getOne();
      if (!result) {
        console.log("nao achou");
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
