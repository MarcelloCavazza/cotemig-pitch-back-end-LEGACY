import { IAuthUpdate, IRecieveUpdateAuthData } from "../../dto/AuthDTO";
import { Auth } from "../../domain/auth";
import { AuthRepository } from "../../repositories/AuthRepository";
import { formatDate } from "../../../../shared/utils/formatDate";
import { AppError } from "../../../../shared/mainError/mainErrorClass";
import { hashSync } from "bcrypt";

export class UpdateAuthUseCase {
  private auth = new Auth();
  private repository = new AuthRepository();
  public async updateById(data: IRecieveUpdateAuthData): Promise<IAuthUpdate> {
    const { id, email, token, password, is_active } = data;
    Object.assign(this.auth, {
      id,
      updated_at: formatDate(new Date().toISOString()),
    });
    if (email) {
      Object.assign(this.auth, {
        email,
      });
    }
    if (token) {
      Object.assign(this.auth, {
        token,
      });
    }
    if (password) {
      Object.assign(this.auth, {
        password: hashSync(password, 12),
      });
    }
    if (is_active) {
      Object.assign(this.auth, {
        is_active,
      });
    }
    try {
      const auth = await this.repository.update(this.auth);

      return auth;
    } catch (error) {
      new AppError(error);
    }
  }
  public async deleteById(id: string): Promise<void> {
    const auth = await this.repository.deleteById(id);
  }
}
