"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = void 0;
const ErrorMap_1 = require("../ErrorMap");
const base_error_1 = require("../base.error");
class PermissionError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.PERMISOS_INSUFICIENTES);
    }
}
exports.PermissionError = PermissionError;
//# sourceMappingURL=PermissionError.js.map