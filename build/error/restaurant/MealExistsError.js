"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealExistsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class MealExistsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.PLATO_EXISTENTE);
    }
}
exports.MealExistsError = MealExistsError;
//# sourceMappingURL=MealExistsError.js.map