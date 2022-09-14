import { IRecieveUpdateClientData } from "../../dto/ClientDTO";
import { Client } from "../../domain/Client";
import { ClientRepository } from "../../repositories/ClientRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
export class UpdateClientUseCase {
  private client = new Client();
  private repository = new ClientRepository();
  public async updateById(data: IRecieveUpdateClientData): Promise<void> {
    const { id, cpf, email, name, password, is_active, telephone } = data;
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
    if (is_active) {
      Object.assign(this.client, {
        is_active,
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
