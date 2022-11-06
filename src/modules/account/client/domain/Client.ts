export enum STATUS_CLIENT {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Client {
  public id: string;
  public is_active: string;
  public name: string;
  public cpf: string;
  public email: string;
  public state: string;
  public password: string;
  public telephone: string;
  public created_at?: string;
  public updated_at?: string;
}
