import express from 'express'
import { addRestaurant, deleteRestaurant, editRestaurant, getAllRestaurants, getOneRestaurant } from "../service/restaurant/restaurant.service";

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

export const editRest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await editRestaurant(parseInt(req.params.restaurantId), body, user)
        return res.status(200).send();  
    } catch (e) {
      next(e)
    }
  };

export const deleteRest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        await deleteRestaurant(parseInt(req.params.restaurantId), user)
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

  export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const restaurant = await getOneRestaurant(parseInt(req.params.restaurantId))
        return res.status(200).send(restaurant);
    } catch (e) {
      next(e)
    }
  };