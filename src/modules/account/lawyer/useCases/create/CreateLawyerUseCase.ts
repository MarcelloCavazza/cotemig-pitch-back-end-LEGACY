import { Lawyer, STATUS_LAWYER } from "../../domain/Lawyer";
import { IRecieveCreateLawyerData } from "../../dto/LawyerDTO";
import { v4 as uuid } from "uuid";
import { LawyerRepository } from "../../repositories/LawyerRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { hashSync } from "bcrypt";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Client } from "src/modules/account/client/domain/Client";

export class CreateLawyerUseCase {
  private lawyer = new Lawyer();
  private user = new Client();
  private repository = new LawyerRepository();

  public async create(data: IRecieveCreateLawyerData): Promise<Lawyer> {
    const {
      optionalId,
      cpf,
      email,
      name,
      password,
      telephone,
      seccional,
      oab_number,
    } = data;

    const id = optionalId ? optionalId : uuid();

    Object.assign(this.user, {
      id,
      cpf,
      email,
      is_active: STATUS_LAWYER.ACTIVE,
      name,
      password: hashSync(password, 12),
      telephone,
      created_at: formatDate(new Date().toISOString()),
    });

    Object.assign(this.lawyer, {
      id,
      user_id: id,
      oab_number,
      is_active: STATUS_LAWYER.ACTIVE,
      created_at: formatDate(new Date().toISOString()),
    });

    if (seccional) {
      Object.assign(this.user, {
        seccional,
      });
    } else {
      Object.assign(this.user, {
        seccional: "Todas",
      });
    }

    try {
      await this.repository.create(this.lawyer);
    } catch (error) {
      return error;
    }

    return this.lawyer;
  }
}
