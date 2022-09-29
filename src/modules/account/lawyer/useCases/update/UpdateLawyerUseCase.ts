import { IRecieveUpdateLawyerData } from "../../dto/LawyerDTO";
import { Lawyer } from "../../domain/Lawyer";
import { LawyerRepository } from "../../repositories/LawyerRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { hashSync } from "bcrypt";

export class UpdateLawyerUseCase {
  private client = new Lawyer();
  private repository = new LawyerRepository();
  public async updateById(data: IRecieveUpdateLawyerData): Promise<void> {
    const {
      id,
      cpf,
      email,
      name,
      password,
      is_active,
      telephone,
      inscrition_type,
    } = data;
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
        password: hashSync(password, 12),
      });
    }
    if (inscrition_type) {
      Object.assign(this.client, {
        inscrition_type,
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
