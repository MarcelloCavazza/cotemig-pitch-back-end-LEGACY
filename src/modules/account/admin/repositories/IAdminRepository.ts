import { IAdmin } from "../dto/AdminDTO";

export interface IAdminRespository {
  create(data: IAdmin): Promise<void>;
  update(data: IAdmin): Promise<void>;
  deleteById(id: string): Promise<void>;
  listById(id: string): Promise<IAdmin>;
}
