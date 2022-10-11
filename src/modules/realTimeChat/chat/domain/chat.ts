export enum STATUS_CHAT {
  ACTIVE = "active",
  INCATIVE = "inactive",
}

export class Chat {
  public id: string;
  public room_name: string;
  public clientId: string;
  public lawyerId: string;
  public is_active: string;
  public created_at: string;
  public updated_at?: string;
}
