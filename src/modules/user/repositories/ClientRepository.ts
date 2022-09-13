import { AppDataSource } from "../../../shared/database/data-source";
import { AppError } from "../../../shared/mainError/mainErrorClass";
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
    throw new Error("Method not implemented.");
  }
  public async deleteById(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async listById(id: string): Promise<IClient> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder(Client, "client")
        .where("client.id = :id", { id })
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
