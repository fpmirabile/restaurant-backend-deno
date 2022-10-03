"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryError = void 0;
const ErrorMap_1 = require("../ErrorMap");
const base_error_1 = require("../base.error");
class CloudinaryError extends base_error_1.BaseError {
    constructor() {
        super(ErrorMap_1.ErrorMap.CLOUDINARY_ERROR);
    }
}
exports.CloudinaryError = CloudinaryError;
//# sourceMappingURL=CloudinaryError.js.map