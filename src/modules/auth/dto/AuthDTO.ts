export interface IRecieveCreateAuthData {
  email: string;
  is_admin?: boolean;
  password: string;
}

export interface IAuth {
  id: string;
  is_active: string;
  is_admin: string;
  email: string;
  token: string;
  password: string;
  created_at: string;
  updated_at?: string;
}

export interface IAuthUpdate {
  id?: string;
  is_active?: string;
  is_admin?: string;
  email?: string;
  token?: string;
  password?: string;
  updated_at?: string;
}

export interface IRecieveUpdateAuthData {
  id: string;
  is_active?: string;
  email?: string;
  is_admin?: string;
  token?: string;
  password?: string;
}
