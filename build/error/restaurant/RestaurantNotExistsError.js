"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantNotExistsError = void 0;
const base_error_1 = require("../base.error");
const ErrorMap_1 = require("../ErrorMap");
class RestaurantNotExistsError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.RESTAURANT_INEXISTENTE);
    }
}
exports.RestaurantNotExistsError = RestaurantNotExistsError;
//# sourceMappingURL=RestaurantNotExistsError.js.map