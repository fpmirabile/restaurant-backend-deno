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
exports.getOne = exports.getAll = exports.deleteM = exports.edit = exports.add = void 0;
const meal_service_1 = require("../service/menu/meal.service");
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const body = req.body;
        yield (0, meal_service_1.addMeal)(parseInt(req.params.categoryId), body, user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.add = add;
const edit = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const body = req.body;
        yield (0, meal_service_1.editMeal)(parseInt(req.params.mealId), body, user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.edit = edit;
const deleteM = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        yield (0, meal_service_1.deleteMeal)(parseInt(req.params.mealId), user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.deleteM = deleteM;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield (0, meal_service_1.getAllMeals)(parseInt(req.params.categoryId));
        return res.status(200).send(meals);
    }
    catch (e) {
        next(e);
    }
});
exports.getAll = getAll;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meal = yield (0, meal_service_1.getMeal)(parseInt(req.params.mealId));
        return res.status(200).send(meal);
    }
    catch (e) {
        next(e);
    }
});
exports.getOne = getOne;
//# sourceMappingURL=meal.controller.js.map