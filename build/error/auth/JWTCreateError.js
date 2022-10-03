"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTCreateError = void 0;
const ErrorMap_1 = require("../ErrorMap");
const base_error_1 = require("../base.error");
class JWTCreateError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.JWT_CREATE);
    }
}
exports.JWTCreateError = JWTCreateError;
//# sourceMappingURL=JWTCreateError.js.map