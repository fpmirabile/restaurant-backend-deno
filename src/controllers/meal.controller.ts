import express from 'express'
import { addMeal, deleteMeal, editMeal, getAllMeals, getMeal } from "../service/menu/meal.service";

export const add = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addMeal(parseInt(req.params.categoryId), body, user)
        return res.status(200).send();  
    } catch (e) {
      next(e)
    }
  };

export const edit = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await editMeal(parseInt(req.params.mealId), body, user)
        return res.status(200).send();  
    } catch (e) {
      next(e)
    }
  };

export const deleteM = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        await deleteMeal(parseInt(req.params.mealId), user)
        return res.status(200).send();  
    } catch (e) {
      next(e)
    }
  };

  export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const meals = await getAllMeals(parseInt(req.params.categoryId))
        return res.status(200).send(meals);
    } catch (e) {
      next(e)
    }
  };

  export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const meal = await getMeal(parseInt(req.params.mealId))
        return res.status(200).send(meal);
    } catch (e) {
      next(e)
    }
  };