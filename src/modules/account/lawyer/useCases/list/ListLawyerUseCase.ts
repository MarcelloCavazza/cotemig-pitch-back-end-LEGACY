import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Lawyer } from "../../domain/Lawyer";
import { LawyerRepository } from "../../repositories/LawyerRepository";

export class ListLawyerUseCase {
  private repository = new LawyerRepository();

  public async listById(id: string): Promise<Lawyer | boolean> {
    try {
      const lawyer = await this.repository.listById(id);
      return lawyer;
    } catch (error) {
      return false;
    }
  }
}
