import { AppDataSource } from "../../../shared/database/data-source";
import { IClient } from "../dto/ClientDTO";
import { Client } from "../infra/entities/ClientEntity";
import { IClientRespository } from "./IClientRepository";

export class ClientRepository implements IClientRespository {
  // private clientRepository = AppDataSource.getRepository(Client);
  public async create(data: IClient) {
    await AppDataSource.manager.save(
      AppDataSource.manager.create(Client, data)
    );
    // await this.clientRepository.save(data);
  }
}
