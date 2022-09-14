import { IRecieveUpdateAdminData } from "../../dto/AdminDTO";
import { Admin } from "../../domain/Admin";
import { AdminRepository } from "../../repositories/AdminRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
export class UpdateAdminUseCase {
  private admin = new Admin();
  private repository = new AdminRepository();
  public async updateById(data: IRecieveUpdateAdminData): Promise<void> {
    const { id, email, name, password, is_active } = data;
    Object.assign(this.admin, {
      id,
      updated_at: formatDate(new Date().toISOString()),
    });
    if (email) {
      Object.assign(this.admin, {
        email,
      });
    }
    if (name) {
      Object.assign(this.admin, {
        name,
      });
    }
    if (password) {
      Object.assign(this.admin, {
        password,
      });
    }
    if (is_active) {
      Object.assign(this.admin, {
        is_active,
      });
    }

    const client = await this.repository.update(this.admin);
  }
  public async deleteById(id: string): Promise<void> {
    const client = await this.repository.deleteById(id);
  }
}
