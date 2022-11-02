export enum STATUS_LAWYER {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Lawyer {
  public id: string;
  public id_user: string;
  public is_active: string;
  public oab_number: string;
  public seccional: string;
  public created_at: string;
  public updated_at?: string;
}
