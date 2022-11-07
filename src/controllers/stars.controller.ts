import express from 'express'
import { errorGenerated } from '../api/middleware/errorHandler';
import { addStars, getComments } from '../service/restaurant/stars.service';
import { setResponse } from './response.controller';

export const add = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addStars(body.stars, user, parseInt(req.params.restaurantId), body.comment)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const comments = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const comments = await getComments(parseInt(req.params.restaurantId))
        setResponse(res, 200, comments)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };