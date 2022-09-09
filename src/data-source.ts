import "reflect-metadata";
import { DataSource } from "typeorm";
import { AddressUser } from "./entity/AddressUser";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: "root",
  password: "root",
  database: "cttdatabase",
  synchronize: true,
  logging: false,
  entities: [User, AddressUser],
  migrations: [],
  subscribers: [],
});
