"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class UserExistsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.USUARIO_EXISTENTE);
    }
}
exports.UserExistsError = UserExistsError;
//# sourceMappingURL=UserExistsError.js.map