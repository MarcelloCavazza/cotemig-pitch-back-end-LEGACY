import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_CLIENT } from "../domain/Client";
import { IClient } from "../dto/ClientDTO";
import { Client } from "../infra/entities/ClientEntity";
import { IClientRespository } from "./IClientRepository";

export class ClientRepository implements IClientRespository {
  private clientRepository = AppDataSource.manager;

  public async create(data: IClient) {
    await this.clientRepository.save(
      this.clientRepository.create(Client, data)
    );
  }
  public async update(data: IClient): Promise<void> {
    const { id, ...params } = data;
    try {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(Client)
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
        .update(Client)
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
        .createQueryBuilder(Client, "client")
        .where("client.id = :id AND client.is_active = 'active'", { id })
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
