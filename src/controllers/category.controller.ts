import express from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
} from "../service/menu/category.service";

export const add = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const body = req.body;
    const newCategory = await addCategory(
      parseInt(req.params.restaurantId),
      body.name,
      user
    );
    return res
      .status(200)
      .send({ id: newCategory.categoryId, name: newCategory.name });
  } catch (e) {
    next(e);
  }
};

export const edit = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    const body = req.body;
    await editCategory(
      parseInt(req.params.restaurantId),
      parseInt(req.params.categoryId),
      body.name,
      user
    );
    return res.status(200).send();
  } catch (e) {
    next(e);
  }
};

export const deleteCat = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = (req as any).user.id;
    await deleteCategory(
      parseInt(req.params.restaurantId),
      parseInt(req.params.categoryId),
      user
    );
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
    const categories = await getCategories(parseInt(req.params.restaurantId));
    return res.status(200).send(categories);
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
    const category = await getCategory(
      parseInt(req.params.restaurantId),
      parseInt(req.params.categoryId)
    );
    return res.status(200).send(category);
  } catch (e) {
    next(e);
  }
};
