"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(error) {
        super();
        this.message = error.message;
        this.status = error.status;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base.error.js.map