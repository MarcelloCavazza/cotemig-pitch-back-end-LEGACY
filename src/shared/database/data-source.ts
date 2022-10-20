import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  migrationsTableName: "migrations",
  name: "default",
  type: "postgres",
  host: process.env.TYPEORM_HOST_PROD,
  port: Number(process.env.TYPEORM_PORT_PROD),
  username: process.env.TYPEORM_USERNAME_PROD,
  password: process.env.TYPEORM_PASSWORD_PROD,
  database: process.env.TYPEORM_DATABASE_PROD,
  synchronize: false,
  logging: false,
  entities: ["src/modules/**/infra/entities/*.ts"],
  migrations: ["src/shared/database/migrations/*.ts"],
  subscribers: [""],
});
