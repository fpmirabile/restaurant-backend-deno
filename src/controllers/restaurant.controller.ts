import express from 'express'
import { errorGenerated } from '../api/middleware/errorHandler';
import { addFavorite, addRestaurant, deleteRestaurant, editRestaurant, getAllRestaurants, getNearRestaurants, getOneRestaurant } from "../service/restaurant/restaurant.service";
import { setResponse } from './response.controller';

export const addNewRest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addRestaurant(body, user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

export const editRest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await editRestaurant(parseInt(req.params.restaurantId), body, user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

export const deleteRest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        await deleteRestaurant(parseInt(req.params.restaurantId), user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const user = (req as any).user.id
        const restaurants = await getAllRestaurants(user)
        setResponse(res, 200, restaurants)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getNear = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const userId = (req as any).user.id
        const restaurants = await getNearRestaurants(parseInt(req.params.lon), parseInt(req.params.lat), userId);
        setResponse(res, 200, restaurants)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const restaurant = await getOneRestaurant(parseInt(req.params.restaurantId), (req as any).user.id)
        setResponse(res, 200, restaurant)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const editFavorite = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        await addFavorite(parseInt(req.params.restaurantId), user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };