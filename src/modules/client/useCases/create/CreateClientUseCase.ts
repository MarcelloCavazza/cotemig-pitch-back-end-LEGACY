import { Client, STATUS_CLIENT } from "../../domain/Client";
import { IRecieveCreateClientData } from "../../dto/ClientDTO";
import { v4 as uuid } from "uuid";
import { ClientRepository } from "../../repositories/ClientRepository";
import { formatDate } from "../../../../shared/utils/formatDate";
import { AppError } from "../../../../shared/mainError/mainErrorClass";

export class CreateClientUseCase {
  private client = new Client();
  private repository = new ClientRepository();

  public async create(data: IRecieveCreateClientData): Promise<Client> {
    const { cpf, email, name, password, telephone } = data;

    Object.assign(this.client, {
      id: uuid(),
      cpf,
      email,
      is_active: STATUS_CLIENT.ACTIVE,
      name,
      password,
      telephone,
      created_at: formatDate(new Date().toISOString()),
    });

    try {
      await this.repository.create(this.client);
    } catch (error) {
      new AppError(error);
    }

    return this.client;
  }
}
