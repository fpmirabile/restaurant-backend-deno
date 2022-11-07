import express from "express";
import { errorGenerated } from "../api/middleware/errorHandler";
import {
  login,
  loginSSO,
  register,
  deleteUser as deleteById,
  getUserById,
} from "../service/user/user.service";
import { setResponse } from "./response.controller";

export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let body = req.body;
    let jwt = await login(body.email, body.password);
    setResponse(res, 201, jwt);
  } catch (e) {
    errorGenerated(e, res);
  }
  next();
};

export const loginUserSSO = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let body = req.body;
    let { refreshToken, token } = await loginSSO(body.email, body.idToken);
    setResponse(res, 201, { refreshToken, token });
  } catch (e) {
    errorGenerated(e, res);
  }
  next();
};

export const registerUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    let body = req.body;
    await register(body);
    setResponse(res, 200, {});
  } catch (e) {
    errorGenerated(e, res);
  }
  next();
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    await deleteById(userId);
    setResponse(res, 200, {});
  } catch (e) {
    errorGenerated(e, res);
  }
  next();
};

export const getLoggedUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const user = await getUserById(userId);

    setResponse(res, 200, user);
  } catch (e) {
    errorGenerated(e, res);
  }
  next();
};
