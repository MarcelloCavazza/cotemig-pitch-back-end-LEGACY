import { IAuth, IAuthUpdate } from "../dto/AuthDTO";

export interface IAuthRespository {
  create(data: IAuth): Promise<void>;
  update(data: IAuth): Promise<IAuthUpdate>;
  deleteById(id: string): Promise<void>;
  listById(id: string): Promise<IAuth>;
  findUserByEmail(email: string): Promise<IAuth>;
}
