require("dotenv").config();
import express from "express";
import morgan from "morgan";
import fs from "fs";
import https from "https";
import Router from "./api/routes/Router";
import { initDatabase } from "./config/database";
import { logHandler } from "./api/middleware/logHandler";

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(morgan("tiny"));
app.use(Router);
app.use(logHandler);

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    error: {
      message: err.message,
    },
  });
});

const port = process.env.PORT || 3001;

initDatabase()
  .then(() => {
    if (process.env.ENV.toLowerCase() === "dev") {
      const options = {
        key: fs.readFileSync("key.pem", "utf-8"),
        cert: fs.readFileSync("cert.pem", "utf-8"),
      };
      https.createServer(options, app).listen(port, () => {
        console.log(`server https runs on port ${port}`);
      });
    } else {
      app.listen(port, () => {
        console.log("Escuchando Puerto: " + port);
      });
    }
  })
  .catch((err) => console.log(err));
