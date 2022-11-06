import { type } from "os";
import { User } from "../../../../account/client/infra/entities/ClientEntity";
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from "typeorm";

@Entity()
export class Lawyer {
  @PrimaryColumn()
  id: string;

  @Column()
  oab_number: string;

  @Column()
  is_active: string;

  @Column()
  created_at?: string;

  @Column()
  updated_at?: string;

  @OneToOne((_) => User, { cascade: true })
  @JoinColumn({ name: "id" })
  userID: User;
}
