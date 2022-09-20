import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Auth {
  @PrimaryColumn()
  id: string;

  @Column()
  token: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_active: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}
