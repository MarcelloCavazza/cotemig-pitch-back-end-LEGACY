import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  @Column()
  status: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}