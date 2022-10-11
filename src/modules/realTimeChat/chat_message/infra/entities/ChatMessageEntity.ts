import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryColumn()
  id: string;

  @Column()
  chat_id: string;

  @Column()
  message_content: string;

  @Column()
  sender_id: string;

  @Column()
  is_active: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}
