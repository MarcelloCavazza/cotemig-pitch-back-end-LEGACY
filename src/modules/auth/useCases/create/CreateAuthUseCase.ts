import { Auth, STATUS_AUTH } from "../../domain/auth";
import { IAuth, IRecieveCreateAuthData } from "../../dto/AuthDTO";
import { v4 as uuid } from "uuid";
import { AuthRepository } from "../../repositories/AuthRepository";
import { formatDate } from "../../../../shared/utils/formatDate";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export class CreateAuthUseCase {
  private auth = new Auth();
  private repository = new AuthRepository();

  public async create(data: IRecieveCreateAuthData): Promise<Auth | String> {
    const { email, password } = data;
    let emailExists = await this.repository.findUserByEmail(email);
    if (!emailExists) {
      this.auth.password = hashSync(password, 12);
      this.auth.id = uuid();

      Object.assign(this.auth, {
        email,
        token: this.createToken(email),
        is_active: STATUS_AUTH.ACTIVE,
        created_at: formatDate(new Date().toISOString()),
      });

      try {
        await this.repository.create(this.auth);
      } catch (error) {
        new AppError(error);
      }

      return this.auth;
    }

    return "email already exists";
  }

  public createToken(user_mail: string) {
    const secretKey = process.env.SECRET_KEY_USER;
    return sign(
      {
        user_id: String(this.auth.id),
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
