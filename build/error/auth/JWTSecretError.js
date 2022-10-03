"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTSecretError = void 0;
const ErrorMap_1 = require("../ErrorMap");
const base_error_1 = require("../base.error");
class JWTSecretError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.JWT_SECRET);
    }
}
exports.JWTSecretError = JWTSecretError;
//# sourceMappingURL=JWTSecretError.js.map