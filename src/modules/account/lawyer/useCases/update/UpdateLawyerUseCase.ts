import { IRecieveUpdateLawyerData } from "../../dto/LawyerDTO";
import { Lawyer } from "../../domain/Lawyer";
import { LawyerRepository } from "../../repositories/LawyerRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { hashSync } from "bcrypt";

export class UpdateLawyerUseCase {
  private client = new Lawyer();
  private repository = new LawyerRepository();
  public async updateById(data: IRecieveUpdateLawyerData): Promise<void> {
    const { id, is_active } = data;
    Object.assign(this.client, {
      id,
      updated_at: formatDate(new Date().toISOString()),
    });
    if (is_active) {
      Object.assign(this.client, {
        is_active,
      });
    }

    const client = await this.repository.update(this.client);
  }
  public async deleteById(id: string): Promise<void> {
    const client = await this.repository.deleteById(id);
  }
}
