export enum STATUS_CHAT {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class ChatMessage {
  public id: string;
  public chat_id: string;
  public message_content: string;
  public sender_id: string;
  public is_active: string;
  public created_at: string;
  public updated_at?: string;
}
