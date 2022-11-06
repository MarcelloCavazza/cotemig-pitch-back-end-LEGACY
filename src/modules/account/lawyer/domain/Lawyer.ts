export enum STATUS_LAWYER {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Lawyer {
  public id: string;
  public userID: string;
  public is_active: string;
  public oab_number: string;
  public created_at: string;
  public updated_at?: string;
}
