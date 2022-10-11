export interface IRecieveCreateChatData {
  chat_id: string;
  message_content: string;
  sender_id: string;
}

export interface IChat {
  id: string;
  chat_id: string;
  message_content: string;
  sender_id: string;
  is_active: string;
  created_at: string;
  updated_at?: string;
}
