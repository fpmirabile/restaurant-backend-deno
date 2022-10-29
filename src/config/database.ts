import { DataSource } from "typeorm";
import * as Models from "../model/models";


export let AppDataSource: DataSource;
export const initDatabase = () => {
  if (AppDataSource) {
    return;
  }

  AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.BD_HOST || "192.168.230.129",
    port: Number(process.env.DB_PORT) || 7000,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "admin",
    database: process.env.DB_NAME || "morfando",
    synchronize: true,
    logging: true,
    entities: Object.values(Models),
  });

  return AppDataSource.initialize();
}
