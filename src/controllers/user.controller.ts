import express from 'express'
import { login, loginSSO, register, deleteUser as deleteById, getUserById } from "../service/user/user.service";


export const loginUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let body = req.body;
        let jwt = await login(body.email, body.password)
        return res.status(201).send(jwt)   
    } catch (e) {
      next(e)
    }
    
  };

export const loginUserSSO = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        let body = req.body;
        let jwt = await loginSSO(body.email, body.idToken)
        return res.status(201).send(jwt)   
    } catch (e) {
      next(e)
    }
  };

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {
        let body = req.body;
        await register(body)
        return res.status(200).send();  
    } catch (e) {
      next(e)
    }
  };

  export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userId = (req as any).user.id
        await deleteById(userId)
        return res.status(200).send();
    } catch (e) {
      next(e)
    }
  };


  export const getLoggedUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userId = (req as any).user.id
        const user = await getUserById(userId)
        return res.status(200).send(user)
    } catch (e) {
      next(e)
    }
  };