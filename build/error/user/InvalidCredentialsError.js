"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class InvalidCredentialsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.CREDENCIALES_INVALIDAS);
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
//# sourceMappingURL=InvalidCredentialsError.js.map