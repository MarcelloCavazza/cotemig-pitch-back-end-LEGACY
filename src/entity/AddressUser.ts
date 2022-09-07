import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AddressUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: string;

  @Column()
  cep: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  status: string;

  @Column()
  number: number;

  @Column()
  lastName: string;

  @Column()
  district: string;

  @Column()
  street: string;

  @Column()
  addtional_info: string;

  @Column()
  created_at: string;

  @Column()
  updated_at: string;
}
