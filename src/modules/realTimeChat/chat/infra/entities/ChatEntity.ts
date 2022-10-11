import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @Column()
  room_name: string;

  @Column()
  clientId: string;

  @Column()
  lawyerId: string;

  @Column()
  is_active: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}
