import { Client } from "../domain/Client";

export interface IClientRespository {
  create(data: Client): Promise<void>;
}
