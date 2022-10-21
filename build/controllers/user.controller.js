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
exports.getLoggedUser = exports.deleteUser = exports.registerUser = exports.loginUserSSO = exports.loginUser = void 0;
const user_service_1 = require("../service/user/user.service");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let jwt = yield (0, user_service_1.login)(body.email, body.password);
        return res.status(201).send(jwt);
    }
    catch (e) {
        next(e);
    }
});
exports.loginUser = loginUser;
const loginUserSSO = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        let jwt = yield (0, user_service_1.loginSSO)(body.email, body.idToken);
        return res.status(201).send(jwt);
    }
    catch (e) {
        next(e);
    }
});
exports.loginUserSSO = loginUserSSO;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body;
        yield (0, user_service_1.register)(body);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.registerUser = registerUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        yield (0, user_service_1.deleteUser)(userId);
        return res.status(200).send();
    }
    catch (e) {
        next(e);
    }
});
exports.deleteUser = deleteUser;
const getLoggedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield (0, user_service_1.getUserById)(userId);
        return res.status(200).send(user);
    }
    catch (e) {
        next(e);
    }
});
exports.getLoggedUser = getLoggedUser;
//# sourceMappingURL=user.controller.js.map