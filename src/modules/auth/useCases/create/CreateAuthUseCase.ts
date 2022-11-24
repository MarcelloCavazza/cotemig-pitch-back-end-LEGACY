import { Auth, STATUS_AUTH } from "../../domain/auth";
import { IAuth, IRecieveCreateAuthData } from "../../dto/AuthDTO";
import { v4 as uuid } from "uuid";
import { AuthRepository } from "../../repositories/AuthRepository";
import { formatDate } from "../../../../shared/utils/formatDate";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
import { ClientRepository } from "../../../account/client/repositories/ClientRepository";
dotenv.config();

export class CreateAuthUseCase {
  private auth = new Auth();
  private repository = new AuthRepository();

  public async create(data: IRecieveCreateAuthData): Promise<Auth | String> {
    const { email, password } = data;
    let emailExists = await this.repository.findUserByEmail(email);
    let user_id = await new ClientRepository().findUserByEmail(email)
    const id = user_id != null ? user_id.id : uuid();
    if (!emailExists) {
      Object.assign(this.auth, {
        id,
        password: hashSync(password, 12),
        email,
        token: this.createToken(email, id),
        is_active: STATUS_AUTH.ACTIVE,
        created_at: formatDate(new Date().toISOString()),
      });
      try {
        await this.repository.create(this.auth);
      } catch (error) {
        console.log(error);
      }

      return this.auth;
    }

    return "email already exists";
  }

  public createToken(user_mail: string, id: string) {
    const secretKey = process.env.SECRET_KEY_USER;
    return sign(
      {
        user_id: id,
        user_mail,
      },
      secretKey,
      {
        subject: String(this.auth.id),
        expiresIn: String(process.env.EXPIRATION_TIME),
      }
    );
  }
}
