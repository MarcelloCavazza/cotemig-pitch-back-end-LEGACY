export interface IRecieveCreateChatData {
  room_name;
  clientId;
  lawyerId;
}

export interface IChat {
  id: string;
  room_name: string;
  clientId: string;
  lawyerId: string;
  is_active: string;
  created_at: string;
  updated_at?: string;
}

export interface IChatUpdate {
  id: string;
  is_active?: string;
  updated_at?: string;
}

export interface IRecieveUpdateChatData {
  id: string;
  is_active?: string;
  updated_at?: string;
}
