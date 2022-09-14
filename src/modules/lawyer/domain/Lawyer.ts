export enum STATUS_LAWYER {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Lawyer {
  public id: string;
  public is_active: string;
  public oab_number: string;
  public seccional: string;
  public inscrition_type: string;
  public name: string;
  public cpf: string;
  public email: string;
  public password: string;
  public telephone: string;
  public created_at: string;
  public updated_at?: string;
}
