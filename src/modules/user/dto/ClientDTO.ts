export interface IRecieveCreateClientData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  telephone: string;
}

export interface IClient {
  id: string;
  status: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  telephone: string;
  created_at: string;
}