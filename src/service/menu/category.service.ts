import { AppDataSource } from "../../config/database";
import { CategoryDTO } from "../../dto/menu/category.dto";
import { CategoryNotExistsError } from "../../error/restaurant/CategoryNotExistsError";
import { RestaurantNotExistsError } from "../../error/restaurant/RestaurantNotExistsError";
import { CategoryBuilder } from "../../model/builder/category.builder";
import { Category, Restaurant } from "../../model/models";

export const addCategory = async (
  restaurantId: number,
  name: string,
  userId: number
) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  let restaurantBD = await restaurantRepository.findOne({
    where: {
      restaurantId: restaurantId,
      user: { userId: userId },
    },
  });

  if (!restaurantBD) {
    throw new RestaurantNotExistsError();
  }

  const categoryRepository = AppDataSource.getRepository(Category);

  const category = new CategoryBuilder()
    .withName(name)
    .withRestaurant(restaurantBD)
    .withStatus("OPERATIVO")
    .build();

  const savedCategory = await categoryRepository.save(category);
  return savedCategory;
};

export const editCategory = async (
  restaurantId: number,
  categoryId: number,
  name: string,
  userId: number
) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  let categoryBD = await categoryRepository.findOne({
    where: {
      restaurant: { restaurantId: restaurantId, user: { userId: userId } },
      categoryId: categoryId,
    },
  });

  if (!categoryBD) {
    throw new CategoryNotExistsError();
  }

  const category = new CategoryBuilder()
    .withName(name)
    .withRestaurant(categoryBD.restaurant)
    .withCategoryId(categoryId)
    .withStatus("OPERATIVO")
    .build();

  await categoryRepository.save(category);
};

export const deleteCategory = async (
  restaurantId: number,
  categoryId: number,
  userId: number
) => {
  const categoryRepository = AppDataSource.getRepository(Category);
  let categoryBD = await categoryRepository.findOne({
    where: {
      restaurant: { restaurantId: restaurantId, user: { userId: userId } },
      categoryId: categoryId,
    },
  });

  if (!categoryBD) {
    throw new CategoryNotExistsError();
  }

  categoryBD.status = "ELIMINADO";

  await categoryRepository.save(categoryBD);
};

export const getCategory = async (restaurantId: number, categoryId: number) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoryBD = await categoryRepository
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.meals", "m")
    .innerJoinAndSelect("c.restaurant", "r")
    .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
    .andWhere("c.categoryId = :categoryId", { categoryId: categoryId })
    .andWhere("c.status = :status", { status: "OPERATIVO" })
    .getOne();

  if (!categoryBD) {
    throw new CategoryNotExistsError();
  }

  return new CategoryDTO(categoryBD);
};

export const getCategories = async (restaurantId: number) => {
  const categoryRepository = AppDataSource.getRepository(Category);

  const categoriesBD = await categoryRepository
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.meals", "m")
    .leftJoinAndSelect("m.images", "im")
    .leftJoinAndSelect("m.ingredients", "i")
    .innerJoinAndSelect("c.restaurant", "r")
    .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
    .andWhere("c.status = :status", { status: "OPERATIVO" })
    .getMany();
    
  if (!categoriesBD || categoriesBD.length === 0) {
    //throw new CategoryNotExistsError();
  }

  let categories = [];

  for (let i = 0; i < categoriesBD.length; i++) {
    categories[i] = new CategoryDTO(categoriesBD[i]);
  }

  return categories;
};
