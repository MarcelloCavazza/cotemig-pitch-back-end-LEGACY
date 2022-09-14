import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Lawyer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  seccional: string;

  @Column()
  inscrition_type: string;

  @Column()
  oab_number: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  telephone: string;

  @Column()
  is_active: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}
