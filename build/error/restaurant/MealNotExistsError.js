"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealNotExistsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class MealNotExistsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.PLATO_NO_EXISTENTE);
    }
}
exports.MealNotExistsError = MealNotExistsError;
//# sourceMappingURL=MealNotExistsError.js.map