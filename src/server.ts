import { Application, Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";

import { logger } from "./middleware/logger.ts";
import { router } from "./routes/routes.ts";
import { configureEnvVars } from "./config/env.ts";
import { getDatabaseConnector } from "./config/db.ts";

const app = new Application<Context>();
const { port, useRequestLogger } = configureEnvVars();

if (useRequestLogger) {
  app.use(logger);
}

const _ = getDatabaseConnector();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log("Listening on: " + url);
});

await app.listen({ port: Number(port) });
