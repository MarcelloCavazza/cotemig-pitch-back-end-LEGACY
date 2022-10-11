import { IClient } from "../dto/ClientDTO";

export interface IClientRespository {
  create(data: IClient): Promise<void>;
  update(data: IClient): Promise<void>;
  deleteById(id: string): Promise<void>;
  listById(id: string): Promise<IClient | boolean>;
}
