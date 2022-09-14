import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class AddressClient {
  @PrimaryColumn()
  id: string;

  @Column()
  client_id: string;

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
  district: string;

  @Column()
  street: string;

  @Column()
  addtional_info: string;

  @Column()
  created_at: string;

  @Column()
  updated_at?: string;
}
