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
exports.authenticatedClient = exports.authenticatedPartner = exports.authenticated = exports.validateLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const JwtService_1 = require("../../service/jwt/JwtService");
const user_service_1 = require("../../service/user/user.service");
const PermissionError_1 = require("../../error/auth/PermissionError");
exports.validateLogin = [
    (0, express_validator_1.body)('usuario').notEmpty(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        next();
    },
];
exports.authenticated = [
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield verifyJWT(req, res, next, null);
    })
];
exports.authenticatedPartner = [
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield verifyJWT(req, res, next, "PARTNER");
    })
];
exports.authenticatedClient = [
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield verifyJWT(req, res, next, "CLIENT");
    })
];
const verifyJWT = (req, res, next, role) => __awaiter(void 0, void 0, void 0, function* () {
    if (!JwtService_1.jwtSecret) {
        return res.send();
    }
    const token = req.headers['authorization'];
    if (!token) {
        console.log('invalid token', token);
        return res
            .status(401)
            .send({ auth: false, message: 'No token provided.' });
    }
    jsonwebtoken_1.default.verify(token, JwtService_1.jwtSecret, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log('error token', err);
            return res
                .status(500)
                .send({ auth: false, message: 'Failed to authenticate token.' });
        }
        try {
            const userToken = jsonwebtoken_1.default.decode(token);
            const user = yield (0, user_service_1.getUserById)(userToken.userId);
            req.user = user;
            if (role != null && role != undefined && user.role != role) {
                console.log("Permisos Insuficientes");
                throw new PermissionError_1.PermissionError();
            }
            next();
        }
        catch (e) {
            console.log("couldn't decode jwt");
            return res.status(500).send({ message: e });
        }
    }));
});
//# sourceMappingURL=auth.js.map