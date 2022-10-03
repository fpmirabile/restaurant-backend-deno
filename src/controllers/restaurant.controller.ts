import express from 'express'
import { addRestaurant, getAllRestaurants } from "../service/restaurant/restaurant.service";

export const addNewRest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addRestaurant(body, user)
        return res.status(200).send();  
    } catch (e) {
      next(e)
    }
  };

  export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const restaurants = await getAllRestaurants()
        return res.status(200).send(restaurants);
    } catch (e) {
      next(e)
    }
  };