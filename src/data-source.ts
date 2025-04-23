import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env

export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: Number(DB_PORT || 3306),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ["src/models/*.ts"],
  synchronize: true,
  logging: false,
});