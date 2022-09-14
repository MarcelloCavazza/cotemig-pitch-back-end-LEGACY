import { IRecieveUpdateClientData } from "../../dto/ClientDTO";
import { Client } from "../../domain/Lawyer";
import { formatDate } from "../../../../shared/utils/formatDate";
import { ClientRepository } from "../../repositories/ClientRepository";
export class UpdateClientUseCase {
  private client = new Client();
  private repository = new ClientRepository();
  public async updateById(data: IRecieveUpdateClientData): Promise<void> {
    const { id, cpf, email, name, password, status, telephone } = data;
    Object.assign(this.client, {
      id,
      updated_at: formatDate(new Date().toISOString()),
    });
    if (cpf) {
      Object.assign(this.client, {
        cpf,
      });
    }
    if (email) {
      Object.assign(this.client, {
        email,
      });
    }
    if (name) {
      Object.assign(this.client, {
        name,
      });
    }
    if (password) {
      Object.assign(this.client, {
        password,
      });
    }
    if (status) {
      Object.assign(this.client, {
        status,
      });
    }
    if (telephone) {
      Object.assign(this.client, {
        telephone,
      });
    }

    const client = await this.repository.update(this.client);
  }
  public async deleteById(id: string): Promise<void> {
    const client = await this.repository.deleteById(id);
  }
}
