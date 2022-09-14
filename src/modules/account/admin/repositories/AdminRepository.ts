import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_ADMIN } from "../domain/Admin";
import { IAdmin } from "../dto/AdminDTO";
import { Admin } from "../infra/entities/AdminEntity";
import { IAdminRespository } from "./IAdminRepository";

export class AdminRepository implements IAdminRespository {
  private clientRepository = AppDataSource.manager;

  public async create(data: IAdmin) {
    await this.clientRepository.save(this.clientRepository.create(Admin, data));
  }
  public async update(data: IAdmin): Promise<void> {
    const { id, ...params } = data;
    try {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(Admin)
        .set(params)
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel atualizar");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async deleteById(id: string): Promise<void> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(Admin)
        .set({ is_active: STATUS_ADMIN.INCATIVE })
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel remover");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async listById(id: string): Promise<IAdmin> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder(Admin, "admin")
        .where("admin.id = :id", { id })
        .getOne();
      if (!result) {
        new AppError("nao achou");
      }
      return result;
    } catch (error) {
      new AppError(error);
    }
  }
}
