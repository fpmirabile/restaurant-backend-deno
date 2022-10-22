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
exports.getOne = exports.getAll = exports.deleteCat = exports.edit = exports.add = void 0;
const category_service_1 = require("../service/menu/category.service");
const add = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        const body = req.body;
        yield (0, category_service_1.addCategory)(parseInt(req.params.restaurantId), body.name, user);
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
        yield (0, category_service_1.editCategory)(parseInt(req.params.restaurantId), parseInt(req.params.categoryId), body.name, user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.edit = edit;
const deleteCat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user.id;
        yield (0, category_service_1.deleteCategory)(parseInt(req.params.restaurantId), parseInt(req.params.categoryId), user);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.deleteCat = deleteCat;
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_service_1.getCategories)(parseInt(req.params.restaurantId));
        return res.status(200).send(categories);
    }
    catch (e) {
        next(e);
    }
});
exports.getAll = getAll;
const getOne = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, category_service_1.getCategory)(parseInt(req.params.restaurantId), parseInt(req.params.categoryId));
        return res.status(200).send(category);
    }
    catch (e) {
        next(e);
    }
});
exports.getOne = getOne;
//# sourceMappingURL=category.controller.js.map