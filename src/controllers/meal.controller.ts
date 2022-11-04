import express from 'express'
import { errorGenerated } from '../api/middleware/errorHandler';
import { addMeal, deleteMeal, editMeal, getAllMeals, getMeal } from "../service/menu/meal.service";
import { setResponse } from './response.controller';

export const add = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addMeal(parseInt(req.params.categoryId), body, user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

export const edit = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await editMeal(parseInt(req.params.mealId), body, user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

export const deleteM = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        await deleteMeal(parseInt(req.params.mealId), user)
        setResponse(res, 200, {}) 
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const meals = await getAllMeals(parseInt(req.params.categoryId))
        setResponse(res, 200, meals)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const meal = await getMeal(parseInt(req.params.mealId))
        setResponse(res, 200, meal)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };