"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeal = exports.getAllMeals = exports.getMeal = exports.editMeal = exports.addMeal = void 0;
const typeorm_1 = require("typeorm");
const Models_1 = require("../../model/Models");
const meal_builder_1 = require("../../model/builder/meal.builder");
const CategoryNotExistsError_1 = require("../../error/restaurant/CategoryNotExistsError");
const MealExistsError_1 = require("../../error/restaurant/MealExistsError");
const CloudinaryService_1 = __importDefault(require("../cloudinary/CloudinaryService"));
const MealNotExistsError_1 = require("../../error/restaurant/MealNotExistsError");
const meal_dto_1 = require("../../dto/menu/meal.dto");
const addMeal = (categoryId, newMeal, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = (0, typeorm_1.getRepository)(Models_1.Category);
    const category = yield categoryRepository.createQueryBuilder('c')
        .innerJoinAndSelect('c.restaurant', 'r')
        .innerJoinAndSelect('r.user', 'u')
        .where("u.userId = :userId", { userId: userId })
        .andWhere("c.categoryId = :categoryId", { categoryId: categoryId })
        .getOne();
    if (!category) {
        throw new CategoryNotExistsError_1.CategoryNotExistsError();
    }
    const mealRepository = (0, typeorm_1.getRepository)(Models_1.Meal);
    let mealBD = yield mealRepository.findOne({ name: newMeal.name, category: { categoryId: categoryId } });
    if (mealBD) {
        throw new MealExistsError_1.MealExistsError();
    }
    let meal = new meal_builder_1.MealBuilder()
        .withNewMeal(newMeal)
        .withStatus("OPERATIVO")
        .withCategory(category)
        .build();
    meal = yield mealRepository.save(meal);
    savePhotosUrls(newMeal.images, meal);
    saveIngredients(newMeal.ingredients, meal);
});
exports.addMeal = addMeal;
const savePhotosUrls = (photos, meal) => __awaiter(void 0, void 0, void 0, function* () {
    if (photos) {
        let photoRepository = (0, typeorm_1.getRepository)(Models_1.PhotoMeal);
        for (let i = 0; i < photos.length; i++) {
            let url = yield CloudinaryService_1.default.uploadImage(photos[i]);
            photoRepository.save(new Models_1.PhotoMeal(url, meal));
        }
    }
});
const saveIngredients = (ingredients, meal) => __awaiter(void 0, void 0, void 0, function* () {
    if (ingredients) {
        let ingredientRepository = (0, typeorm_1.getRepository)(Models_1.Ingredient);
        for (let i = 0; i < ingredients.length; i++) {
            ingredientRepository.save(new Models_1.Ingredient(ingredients[i], meal));
        }
    }
});
const editMeal = (mealId, newMeal, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const mealRepository = (0, typeorm_1.getRepository)(Models_1.Meal);
    //let mealBD = await mealRepository.findOne({mealId : mealId, status:"OPERATIVO", category:{restaurant:{user:{userId:userId}}}})
    const mealBD = yield mealRepository.createQueryBuilder('m')
        .innerJoinAndSelect('m.category', 'c')
        .innerJoinAndSelect('c.restaurant', 'r')
        .innerJoinAndSelect('r.user', 'u')
        .where("u.userId = :userId", { userId: userId })
        .andWhere("m.status = :status", { status: "OPERATIVO" })
        .andWhere("m.mealId = :mealId", { mealId: mealId })
        .getOne();
    if (!mealBD) {
        throw new MealNotExistsError_1.MealNotExistsError();
    }
    const meal = new meal_builder_1.MealBuilder()
        .withMeal(mealBD)
        .withNewMeal(newMeal)
        .build();
    yield mealRepository.save(meal);
    if (newMeal.images) {
        let photoRepository = (0, typeorm_1.getRepository)(Models_1.PhotoMeal);
        photoRepository.delete({ meal: { mealId: mealId } });
        savePhotosUrls(newMeal.images, meal);
    }
    if (newMeal.ingredients) {
        let ingredientsRepository = (0, typeorm_1.getRepository)(Models_1.Ingredient);
        ingredientsRepository.delete({ meal: { mealId: mealId } });
        saveIngredients(newMeal.ingredients, meal);
    }
});
exports.editMeal = editMeal;
const getMeal = (mealId) => __awaiter(void 0, void 0, void 0, function* () {
    const mealRepository = (0, typeorm_1.getRepository)(Models_1.Meal);
    let mealBD = yield mealRepository.findOne({ mealId: mealId, status: "OPERATIVO" });
    if (!mealBD) {
        throw new MealNotExistsError_1.MealNotExistsError();
    }
    return new meal_dto_1.MealDTO(mealBD);
});
exports.getMeal = getMeal;
const getAllMeals = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const mealRepository = (0, typeorm_1.getRepository)(Models_1.Meal);
    let mealsBD = yield mealRepository.find({ category: { categoryId: categoryId }, status: "OPERATIVO" });
    if (!mealsBD) {
        throw new MealNotExistsError_1.MealNotExistsError();
    }
    const meals = [];
    for (let i = 0; i < mealsBD.length; i++) {
        meals[i] = new meal_dto_1.MealDTO(mealsBD[i]);
    }
    return meals;
});
exports.getAllMeals = getAllMeals;
const deleteMeal = (mealId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const mealRepository = (0, typeorm_1.getRepository)(Models_1.Meal);
    let mealBD = yield mealRepository.findOne({ mealId: mealId, status: "OPERATIVO", category: { restaurant: { user: { userId: userId } } } });
    if (!mealBD) {
        throw new MealNotExistsError_1.MealNotExistsError();
    }
    const newMeal = new meal_builder_1.MealBuilder()
        .withMeal(mealBD)
        .withStatus("ELIMINADO")
        .build();
    yield mealRepository.save(newMeal);
});
exports.deleteMeal = deleteMeal;
//# sourceMappingURL=meal.service.js.map