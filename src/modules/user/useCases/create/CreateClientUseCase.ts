import { Client, STATUS_CLIENT } from "../../domain/Client";
import { IRecieveCreateClientData } from "../../dto/ClientDTO";
import { v4 as uuid } from "uuid";
import { ClientRepository } from "../../repositories/ClientRepository";
import { formatDate } from "../../../../shared/utils/formatDate";

export class CreateUserUseCase {
  client = new Client();

  public async create(data: IRecieveCreateClientData): Promise<Client> {
    const { cpf, email, name, password, telephone } = data;
    const repository = new ClientRepository();
    Object.assign(this.client, {
      id: uuid(),
      cpf,
      email,
      status: STATUS_CLIENT.ACTIVE,
      name,
      password,
      telephone,
      created_at: formatDate(new Date().toISOString()),
    });
    console.log(this.client);
    try {
      await repository.create(this.client);
    } catch (error) {
      console.log(error);
    }

    return this.client;
  }
}
