import { AppDataSource } from "../../../../shared/database/data-source";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { STATUS_LAWYER } from "../domain/Lawyer";
import { ILawyer } from "../dto/LawyerDTO";
import { Lawyer } from "../infra/entities/LawyerEntity";
import { ILawyerRepository } from "./ILawyerRepository";

export class LawyerRepository implements ILawyerRepository {
  private clientRepository = AppDataSource.manager;

  public async create(data: ILawyer) {
    await this.clientRepository.save(
      this.clientRepository.create(Lawyer, data)
    );
  }
  public async update(data: ILawyer): Promise<void> {
    const { id, ...params } = data;
    try {
      const result = await this.clientRepository
        .createQueryBuilder()
        .update(Lawyer)
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
        .update(Lawyer)
        .set({ is_active: STATUS_LAWYER.INCATIVE })
        .where("id = :id", { id })
        .execute();
      if (!result) {
        new AppError("nao foi possivel remover");
      }
    } catch (error) {
      new AppError(error);
    }
  }
  public async listById(id: string): Promise<ILawyer | boolean> {
    try {
      const result = await this.clientRepository
        .createQueryBuilder(Lawyer, "lawyer")
        .where("lawyer.id = :id AND lawyer.is_active = 'active'", { id })
        .getOne();
      if (!result) {
        return false;
      }
      return result;
    } catch (error) {
      return false;
    }
  }
}
