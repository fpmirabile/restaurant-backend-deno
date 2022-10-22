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
exports.getOne = exports.getAll = exports.deleteRest = exports.editRest = exports.addNewRest = void 0;
const restaurant_service_1 = require("../service/restaurant/restaurant.service");
const addNewRest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const body = req.body;
        yield (0, restaurant_service_1.addRestaurant)(body, user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.addNewRest = addNewRest;
const editRest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const body = req.body;
        yield (0, restaurant_service_1.editRestaurant)(parseInt(req.params.restaurantId), body, user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.editRest = editRest;
const deleteRest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        yield (0, restaurant_service_1.deleteRestaurant)(parseInt(req.params.restaurantId), user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.deleteRest = deleteRest;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield (0, restaurant_service_1.getAllRestaurants)();
        return res.status(200).send(restaurants);
    }
    catch (e) {
        next(e);
    }
});
exports.getAll = getAll;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield (0, restaurant_service_1.getOneRestaurant)(parseInt(req.params.restaurantId));
        return res.status(200).send(restaurant);
    }
    catch (e) {
        next(e);
    }
});
exports.getOne = getOne;
//# sourceMappingURL=restaurant.controller.js.map