"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferentPasswordsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class DifferentPasswordsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.CONTRASEÑAS_DIFERENTES);
    }
}
exports.DifferentPasswordsError = DifferentPasswordsError;
//# sourceMappingURL=DifferentPasswordsError.js.map