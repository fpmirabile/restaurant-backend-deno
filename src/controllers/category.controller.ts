import express from 'express'
import { errorGenerated } from '../api/middleware/errorHandler';
import { addCategory, deleteCategory, editCategory, getCategories, getCategory } from '../service/menu/category.service';
import { setResponse } from './response.controller';

export const add = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        const body = req.body;
        await addCategory(parseInt(req.params.restaurantId), body.name, user)
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
        await editCategory(parseInt(req.params.restaurantId), parseInt(req.params.categoryId), body.name, user)
        setResponse(res, 200, {}) 
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

export const deleteCat = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const user = (req as any).user.id
        await deleteCategory(parseInt(req.params.restaurantId), parseInt(req.params.categoryId), user)
        setResponse(res, 200, {})
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const categories = await getCategories(parseInt(req.params.restaurantId))
        setResponse(res, 200, categories)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };

  export const getOne = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const category = await getCategory(parseInt(req.params.restaurantId), parseInt(req.params.categoryId))
        setResponse(res, 200, category)
      } catch (e) {
        errorGenerated(e, res)
      }
      next()
  };