export enum STATUS_ADDRESS {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class ClientAddress {
  public id: string;
  public client_id: string;
  public cep: string;
  public city: string;
  public number: number;
  public state: string;
  public status: string;
  public district: string;
  public street: string;
  public addtional_info: string;
  public created_at: string;
  public updated_at?: string;
}
