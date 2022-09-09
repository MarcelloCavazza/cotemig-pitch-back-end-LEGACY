import "reflect-metadata";
import { DataSource } from "typeorm";
import { AddressUser } from "../../modules/user/infra/entities/AddressUser";
import { User } from "../../modules/user/infra/entities/User";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  migrationsTableName: "migrations",
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5434,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, AddressUser],
  migrations: ["src/migrations/*.ts"],
  subscribers: [""],
});
