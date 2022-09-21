import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  migrationsTableName: "migrations",
  name: "default",
  type: "postgres",
  host: process.env.TYPEORM_HOST,
  port: 5434,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  entities: ["src/modules/**/infra/entities/*.ts"],
  migrations: ["src/shared/database/migrations/*.ts"],
  subscribers: [""],
});
