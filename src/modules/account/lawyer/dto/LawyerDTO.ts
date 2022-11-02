export interface IRecieveCreateLawyerData {
  name: string;
  cpf: string;
  email: string;
  seccional: string;
  oab_number: string;
  password: string;
  telephone: string;
}

export interface ILawyer {
  id: string;
  id_user: string;
  is_active: string;
  oab_number: string;
  created_at: string;
  updated_at?: string;
}

export interface IRecieveUpdateLawyerData {
  id: string;
  is_active?: string;
  oab_number?: string;
}
