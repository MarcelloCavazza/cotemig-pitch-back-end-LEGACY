import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Admin } from "../../domain/Admin";
import { AdminRepository } from "../../repositories/AdminRepository";

export class ListAdminUseCase {
  private repository = new AdminRepository();

  public async listById(id: string): Promise<Admin> {
    try {
      const client = await this.repository.listById(id);
      return client;
    } catch (error) {
      new AppError(error);
    }
  }
}
