import { Admin, STATUS_ADMIN } from "../../domain/Admin";
import { IRecieveCreateAdminData } from "../../dto/AdminDTO";
import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";
import { AdminRepository } from "../../repositories/AdminRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";

export class CreateAdminUseCase {
  private client = new Admin();
  private repository = new AdminRepository();

  public async create(data: IRecieveCreateAdminData): Promise<Admin> {
    const { email, name, password } = data;

    Object.assign(this.client, {
      id: uuid(),
      email,
      is_active: STATUS_ADMIN.ACTIVE,
      name,
      password: hashSync(password, 12),
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
