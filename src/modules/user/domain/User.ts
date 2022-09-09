export enum STATUS_USER {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export enum PROFILE_USER {
  ADMIN = "",
  CLIENT = "",
  LAWYER = "",
}

export class User {
  public id: string;
  public status: string;
  public profile: string;
  public name: string;
  public cpf: string;
  public email: string;
  public password: string;
  public telephone: string;
  public created_at: string;
  public updated_at?: string;
}
