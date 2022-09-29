export enum STATUS_AUTH {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Auth {
  public id: string;
  public is_active: string;
  public is_admin: string;
  public email: string;
  public token: string;
  public password: string;
  public created_at: string;
  public updated_at?: string;
}
