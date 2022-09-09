import {
  Database,
  Model,
  MySQLConnector,
} from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";
import * as Models from "../models/index.ts";
import { configureEnvVars } from "./env.ts";

export const getDatabaseConnector = () => {
  const { hostname, dbPort, dbName, dbUsername, dbPassword } =
    configureEnvVars();
  const connector = new MySQLConnector({
    host: hostname,
    port: Number(dbPort),
    username: dbUsername,
    password: dbPassword,
    database: dbName,
  });

  const db = new Database(connector);

  db.link(getAllModels());
  db.sync({});
  return db;
};

const getAllModels = (): typeof Model[] => {
  return Object.values(Models).map(t => t);
};
