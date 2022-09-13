import { Client } from "../../domain/Client";
import { IRecieveCreateClientData } from "../../dto/ClientDTO";
import { v4 as uuid } from "uuid";

export class CreateUserUseCase {
  private user: Client;

  public async create(data: IRecieveCreateClientData): Promise<Client> {
    const { cpf, email, name, password, telephone } = data;

    Object.assign(this.user, {
      id: uuid(),
      cpf,
      email,
      name,
      password,
      telephone,
    });

    return this.user;
  }
}
