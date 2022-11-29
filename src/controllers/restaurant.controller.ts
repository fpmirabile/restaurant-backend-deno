import express from "express";
import {
  addFavorite,
  addRestaurant,
  deleteRestaurant,
  editRestaurant,
  getAllRestaurants,
  getFavoritesRestaurants,
  getNearRestaurants,
  getOneRestaurant,
  changeOpen,
  Filter,
} from "../service/restaurant/restaurant.service";

export const addNewRest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const body = req.body;
    const newResto = await addRestaurant(body, user);
    return res.status(200).send({ id: newResto.restaurantId });
  } catch (e) {
    next(e);
  }
};

export const editRest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const body = req.body;
    await editRestaurant(parseInt(req.params.restaurantId), body, user);
    return res.status(200).send();
  } catch (e) {
    next(e);
  }
};

export const deleteRest = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    await deleteRestaurant(parseInt(req.params.restaurantId), user);
    return res.status(200).send();
  } catch (e) {
    next(e);
  }
};

export const getAll = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const restaurants = await getAllRestaurants(user);
    return res.status(200).send(restaurants);
  } catch (e) {
    next(e);
  }
};

export const getNear = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const filters: Filter = {
      foodType: req.query.foodType as string | undefined,
      priceRange: req.query.priceRange as string | undefined,
      stars: Number(req.query.stars as string | undefined),
    };
    const restaurants = await getNearRestaurants(
      parseFloat(req.params.lon),
      parseFloat(req.params.lat),
      userId,
      parseInt(req.params.distance),
      filters,
    );
    return res.status(200).send(restaurants);
  } catch (e) {
    next(e);
  }
};

export const getOne = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const restaurant = await getOneRestaurant(
      parseInt(req.params.restaurantId),
      (req as any).user.id
    );
    return res.status(200).send(restaurant);
  } catch (e) {
    next(e);
  }
};

export const editFavorite = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    await addFavorite(parseInt(req.params.restaurantId), user);
    return res.status(200).send();
  } catch (e) {
    next(e);
  }
};

export const getFavorites = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const restaurants = await getFavoritesRestaurants(user);
    return res.status(200).send(restaurants);
  } catch (e) {
    next(e);
  }
};

export const open = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    await changeOpen(parseInt(req.params.restaurantId), user);
    return res.status(200).send();
  } catch (e) {
    next(e);
  }
};
