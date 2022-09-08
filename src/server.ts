import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std/fmt/colors.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { logger } from "./middleware/logger.ts";
import { router } from "./routes/routes.ts";
import { configureEnvVars } from "./config/env.ts";

const app = new Application<Context>();
const {
  port,
  useRequestLogger,
} = configureEnvVars();

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
