import { AppDataSource } from "../../../shared/database/data-source";
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
}
