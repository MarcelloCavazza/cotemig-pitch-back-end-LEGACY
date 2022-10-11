import { IChatUpdate, IRecieveUpdateChatData } from "../../dto/ChatDTO";
import { Chat } from "../../domain/chat";
import { ChatRepository } from "../../repositories/ChatRepository";
import { formatDate } from "../../../../../shared/utils/formatDate";
import { AppError } from "../../../../../shared/mainError/mainErrorClass";
import { hashSync } from "bcrypt";

export class UpdateChatUseCase {
  private auth = new Chat();
  private repository = new ChatRepository();
  public async updateById(data: IRecieveUpdateChatData): Promise<IChatUpdate> {
    const { id, is_active } = data;
    Object.assign(this.auth, {
      id,
      updated_at: formatDate(new Date().toISOString()),
    });

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
