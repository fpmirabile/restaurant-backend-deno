import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

let client: Client;
export const getDatabaseClient = async (
): Promise<Client> => {
  if (client) {
    return client;
  }

  try {
    const {
      DB_HOSTNAME: hostname,
      DB_PORT: port,
      DB: db,
      DB_USER: username,
      DB_PASS: password,
    } = config();
    client = await new Client();
    client.connect({
      hostname,
      username,
      password,
      port: Number(port),
      db,
    });
  } catch (error) {
    if (error.message.includes("Unknown database")) {
      Promise.reject(new Error("Database is not set properly."));
      return client;
    }
  }

  return client;
};
