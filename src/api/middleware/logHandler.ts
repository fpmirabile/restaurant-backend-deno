import express from "express";
import { AppDataSource } from "../../config/database";
import { Log } from "../../model/models";

export const logHandler = [
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    let status = 200;
    let body = {};

    let logRepository = AppDataSource.getRepository(Log);
    let log = new Log();
    log.request = req.body;
    log.status = status;
    log.url = req.url;
    log.verb = "@" + req.method;
    if ((req as any).user) {
      log.userId = (req as any).user.id;
    }
    if ((res as any).response && (res as any).response.body) {
      body = (res as any).response.body;
    }
    if ((res as any).response && (res as any).response.status) {
      status = (res as any).response.status;
    }

    log.status = status;
    log.response = JSON.stringify(body);
    log.date = new Date();

    logRepository.save(log);

    return next();
  },
];
