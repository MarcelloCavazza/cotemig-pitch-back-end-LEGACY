import { Lawyer, STATUS_LAWYER } from "../../domain/Lawyer";
import { IRecieveCreateLawyerData } from "../../dto/LawyerDTO";
import { v4 as uuid } from "uuid";
import { LawyerRepository } from "../../repositories/LawyerRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { hashSync } from "bcrypt";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Client } from "src/modules/account/client/domain/Client";
import { ClientRepository } from "src/modules/account/client/repositories/ClientRepository";
import { User } from "src/modules/account/client/infra/entities/ClientEntity";

export class CreateLawyerUseCase {
  private lawyer = new Lawyer();
  private user = new Client();
  private repositoryLawyer = new LawyerRepository();
  private repositoryClient = new ClientRepository();

  public async create(data: IRecieveCreateLawyerData): Promise<any> {
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
      id: uuid(),
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

    await this.repositoryLawyer
      .create(this.lawyer)
      .then(async () => {
        await this.repositoryClient.create(this.user).catch((error) => {
          return error;
        });
      })
      .catch((error) => {
        return error;
      });

    const lawyerInfo = this.lawyer;
    const userInfo = this.user;

    return { lawyerInfo, userInfo };
  }
}
