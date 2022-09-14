export interface IRecieveCreateAdminData {
  name: string;
  email: string;
  password: string;
}

export interface IAdmin {
  id: string;
  is_active: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at?: string;
}

export interface IRecieveUpdateAdminData {
  id: string;
  is_active?: string;
  name?: string;
  email?: string;
  password?: string;
}
