import { Client } from "https://deno.land/x/mysql@v2.10.2/mod.ts";

let client: Client;
export const getMySqlClient = async (
  hostname: string,
  port: number,
  db: string,
  username: string,
  password: string
): Promise<Client> => {
  if (client) {
    return client;
  }

  try {
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
