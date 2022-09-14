export enum STATUS_ADMIN {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Admin {
  public id: string;
  public is_active: string;
  public name: string;
  public email: string;
  public password: string;
  public created_at: string;
  public updated_at?: string;
}
