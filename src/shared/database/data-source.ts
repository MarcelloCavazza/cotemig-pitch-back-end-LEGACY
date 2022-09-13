import "reflect-metadata";
import { DataSource } from "typeorm";
import { AddressClient } from "../../modules/user/infra/entities/AddressClient";
import { Client } from "../../modules/user/infra/entities/Client";
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
  entities: [Client, AddressClient],
  migrations: ["src/shared/database/migrations/*.ts"],
  subscribers: [""],
});
