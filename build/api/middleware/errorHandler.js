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
exports.errorHandler = void 0;
const base_error_1 = require("../../error/base.error");
exports.errorHandler = [
    (err, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (err instanceof base_error_1.BaseError) {
            console.log(err);
            res.status(err.status).send({ message: err.message });
        }
        else {
            console.log(err);
            res.status(500).send({ message: "Ocurrio un error inesperado" });
        }
    }),
];
//# sourceMappingURL=errorHandler.js.map