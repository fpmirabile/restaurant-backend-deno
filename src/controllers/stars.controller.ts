import express from 'express'
import { addStars, getComments } from '../service/restaurant/stars.service';
export const add = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addStars(body.stars, user, parseInt(req.params.restaurantId), body.comment)
        return res.status(200).send(); 
      } catch (e) {
        next(e)
      }
  };

  export const comments = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const comments = await getComments(parseInt(req.params.restaurantId))
        return res.status(200).send(comments); 
      } catch (e) {
        next(e)
      }
  };