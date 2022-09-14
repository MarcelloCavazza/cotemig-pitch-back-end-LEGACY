import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { Client } from "../../domain/Lawyer";
import { ClientRepository } from "../../repositories/ClientRepository";

export class ListClientUseCase {
  private repository = new ClientRepository();

  public async listById(id: string): Promise<Client> {
    try {
      const client = await this.repository.listById(id);
      return client;
    } catch (error) {
      new AppError(error);
    }
  }
}
