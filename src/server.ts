import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { green, yellow } from "https://deno.land/std/fmt/colors.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { logger } from "./middleware/logger.ts";
import { router } from "./routes/routes.ts";
import { getMySqlClient } from "./config/db.ts";

const app = new Application<Context>();
const {
  DB_HOSTNAME: hostname,
  DB_PORT: dbPort,
  DB: db,
  DB_USER: username,
  DB_PASS: password,
  PORT: port,
  LOG_REQUEST: useRequestLogger,
} = config();

await getMySqlClient(hostname, Number(dbPort), db, username, password);
if (useRequestLogger) {
  app.use(logger);
}

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});

await app.listen({ port: Number(port) });
