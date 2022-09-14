import { Lawyer, STATUS_LAWYER } from "../../domain/Lawyer";
import { IRecieveCreateLawyerData } from "../../dto/LawyerDTO";
import { v4 as uuid } from "uuid";
import { LawyerRepository } from "../../repositories/LawyerRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";

export class CreateLawyerUseCase {
  private client = new Lawyer();
  private repository = new LawyerRepository();

  public async create(data: IRecieveCreateLawyerData): Promise<Lawyer> {
    const {
      cpf,
      email,
      name,
      password,
      telephone,
      seccional,
      oab_number,
      inscrition_type,
    } = data;

    Object.assign(this.client, {
      id: uuid(),
      cpf,
      email,
      oab_number,
      is_active: STATUS_LAWYER.ACTIVE,
      name,
      password,
      telephone,
      created_at: formatDate(new Date().toISOString()),
    });

    if (seccional) {
      Object.assign(this.client, {
        seccional,
      });
    } else {
      Object.assign(this.client, {
        seccional: "Todas",
      });
    }
    if (inscrition_type) {
      Object.assign(this.client, {
        inscrition_type,
      });
    } else {
      Object.assign(this.client, {
        inscrition_type: "Todas",
      });
    }

    try {
      await this.repository.create(this.client);
    } catch (error) {
      new AppError(error);
    }

    return this.client;
  }
}
