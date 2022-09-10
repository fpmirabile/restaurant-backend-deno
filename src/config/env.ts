import { config } from "https://deno.land/x/dotenv/mod.ts";

export const configureEnvVars = () => {
  const env = Deno.env.get("ENV");
  if (env === "prod") {
    return {
      hostname: Deno.env.get("DB_HOSTNAME") || "",
      dbPort: Deno.env.get("DB_PORT") || "",
      dbName: Deno.env.get("DB") || "",
      dbUsername: Deno.env.get("DB_USER") || "",
      dbPassword: Deno.env.get("DB_PASS") || "",
      port: Deno.env.get("PORT") || "",
      useRequestLogger: Deno.env.get("LOG_REQUEST") || "",
      env,
    };
  }

  const {
    DB_HOSTNAME: hostname,
    DB_PORT: dbPort,
    DB: dbName,
    DB_USER: dbUsername,
    DB_PASS: dbPassword,
    PORT: port,
    LOG_REQUEST: useRequestLogger,
    ENV: dev,
  } = config();

  return {
    hostname,
    dbPort,
    dbName,
    dbUsername,
    dbPassword,
    port,
    useRequestLogger,
    env: dev
  };
};
