import { Lawyer, STATUS_LAWYER } from "../../domain/Lawyer";
import { IRecieveCreateLawyerData } from "../../dto/LawyerDTO";
import { v4 as uuid } from "uuid";
import { LawyerRepository } from "../../repositories/LawyerRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { hashSync } from "bcrypt";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { Client } from "../../../../../modules/account/client/domain/Client";
import { ClientRepository } from "../../../../../modules/account/client/repositories/ClientRepository";
import { User } from "../../../../../modules/account/client/infra/entities/ClientEntity";

export class CreateLawyerUseCase {
  private lawyer = new Lawyer();
  private user = new Client();
  private repositoryLawyer = new LawyerRepository();
  private repositoryClient = new ClientRepository();

  public async create(data: IRecieveCreateLawyerData): Promise<any> {
    const { cpf, email, name, password, telephone, state, oab_number } = data;

    Object.assign(this.user, {
      id: uuid(),
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
      userID: this.user.id,
      oab_number,
      is_active: STATUS_LAWYER.ACTIVE,
      created_at: formatDate(new Date().toISOString()),
    });

    if (state) {
      Object.assign(this.user, {
        state,
      });
    } else {
      Object.assign(this.user, {
        state: "all",
      });
    }
    console.log(this.lawyer);
    await this.repositoryLawyer
      .create(this.lawyer)
      .then(async () => {
        await this.repositoryClient.create(this.user).catch((error) => {
          console.log("priemrio erro", error);
          return error;
        });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });

    const lawyerInfo = this.lawyer;
    const userInfo = this.user;

    return { lawyerInfo, userInfo };
  }
}
