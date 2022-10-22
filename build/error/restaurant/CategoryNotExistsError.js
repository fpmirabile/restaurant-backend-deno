"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryNotExistsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class CategoryNotExistsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.CATEGORIA_INEXISTENTE);
    }
}
exports.CategoryNotExistsError = CategoryNotExistsError;
//# sourceMappingURL=CategoryNotExistsError.js.map