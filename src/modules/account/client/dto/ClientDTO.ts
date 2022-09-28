export interface IRecieveCreateClientData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  optionalId: string;
  telephone: string;
}

export interface IClient {
  id: string;
  is_active: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  telephone: string;
  created_at: string;
  updated_at?: string;
}

export interface IRecieveUpdateClientData {
  id: string;
  is_active?: string;
  name?: string;
  cpf?: string;
  email?: string;
  password?: string;
  telephone?: string;
}
