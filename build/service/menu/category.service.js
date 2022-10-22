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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.getCategory = exports.deleteCategory = exports.editCategory = exports.addCategory = void 0;
const typeorm_1 = require("typeorm");
const category_dto_1 = require("../../dto/menu/category.dto");
const CategoryNotExistsError_1 = require("../../error/restaurant/CategoryNotExistsError");
const RestaurantNotExistsError_1 = require("../../error/restaurant/RestaurantNotExistsError");
const category_builder_1 = require("../../model/builder/category.builder");
const Models_1 = require("../../model/Models");
const addCategory = (restaurantId, name, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    let restaurantBD = yield restaurantRepository.findOne({ restaurantId: restaurantId, user: { userId: userId } });
    if (!restaurantBD) {
        throw new RestaurantNotExistsError_1.RestaurantNotExistsError();
    }
    const categoryRepository = (0, typeorm_1.getRepository)(Models_1.Category);
    const category = new category_builder_1.CategoryBuilder()
        .withName(name)
        .withRestaurant(restaurantBD)
        .withStatus("OPERATIVO")
        .build();
    yield categoryRepository.save(category);
});
exports.addCategory = addCategory;
const editCategory = (restaurantId, categoryId, name, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = (0, typeorm_1.getRepository)(Models_1.Category);
    let categoryBD = yield categoryRepository.findOne({
        restaurant: { restaurantId: restaurantId, user: { userId: userId }
        }, categoryId: categoryId
    });
    if (!categoryBD) {
        throw new CategoryNotExistsError_1.CategoryNotExistsError();
    }
    const category = new category_builder_1.CategoryBuilder()
        .withName(name)
        .withRestaurant(categoryBD.restaurant)
        .withCategoryId(categoryId)
        .withStatus("OPERATIVO")
        .build();
    yield categoryRepository.save(category);
});
exports.editCategory = editCategory;
const deleteCategory = (restaurantId, categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = (0, typeorm_1.getRepository)(Models_1.Category);
    let categoryBD = yield categoryRepository.findOne({
        restaurant: { restaurantId: restaurantId, user: { userId: userId }
        }, categoryId: categoryId
    });
    if (!categoryBD) {
        throw new CategoryNotExistsError_1.CategoryNotExistsError();
    }
    categoryBD.status = "ELIMINADO";
    yield categoryRepository.save(categoryBD);
});
exports.deleteCategory = deleteCategory;
const getCategory = (restaurantId, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = (0, typeorm_1.getRepository)(Models_1.Category);
    const categoryBD = yield categoryRepository.createQueryBuilder('c')
        .leftJoinAndSelect('c.meals', 'm')
        .innerJoinAndSelect('c.restaurant', 'r')
        .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
        .andWhere("c.categoryId = :categoryId", { categoryId: categoryId })
        .andWhere("c.status = :status", { status: "OPERATIVO" })
        .getOne();
    if (!categoryBD) {
        throw new CategoryNotExistsError_1.CategoryNotExistsError();
    }
    return new category_dto_1.CategoryDTO(categoryBD);
});
exports.getCategory = getCategory;
const getCategories = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryRepository = (0, typeorm_1.getRepository)(Models_1.Category);
    const categoriesBD = yield categoryRepository.createQueryBuilder('c')
        .leftJoinAndSelect('c.meals', 'm')
        .innerJoinAndSelect('c.restaurant', 'r')
        .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
        .andWhere("c.status = :status", { status: "OPERATIVO" })
        .getMany();
    if (!categoriesBD || categoriesBD.length === 0) {
        throw new CategoryNotExistsError_1.CategoryNotExistsError();
    }
    let categories = [];
    for (let i = 0; i < categoriesBD.length; i++) {
        categories[i] = new category_dto_1.CategoryDTO(categoriesBD[i]);
    }
    return categories;
});
exports.getCategories = getCategories;
//# sourceMappingURL=category.service.js.map