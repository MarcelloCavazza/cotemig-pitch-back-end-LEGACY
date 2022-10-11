import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class ChatEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  room_name: string;

  @Column()
  clientId: string;

  @Column()
  lawyerId: string;

  @Column()
  status: string;

  @Column()
  is_active: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}
