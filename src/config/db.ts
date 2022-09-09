import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";
import {
  Database,
  Model,
  MySQLConnector,
} from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";
import * as Models from "../models/index.ts";
import { configureEnvVars } from "./env.ts";

let client: Client;
export const getDatabaseClient = async (): Promise<Client> => {
  if (client) {
    return client;
  }

  try {
    const { hostname, dbPort, dbName, dbUsername, dbPassword } =
      configureEnvVars();
    client = await new Client();
    client.connect({
      hostname,
      username: dbUsername,
      password: dbPassword,
      port: Number(dbPort),
      db: dbName,
    });
  } catch (error) {
    if (error.message.includes("Unknown database")) {
      Promise.reject(new Error("Database is not set properly."));
      return client;
    }
  }

  return client;
};

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
  return [Models.TestModel, Models.Usuario];
};
