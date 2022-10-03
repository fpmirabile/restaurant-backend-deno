"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
const cloudinary_2 = require("../../config/cloudinary");
const CloudinaryError_1 = require("../../error/other/CloudinaryError");
class CloudinaryService {
    constructor() {
        this.baseFile = "recetas/";
        this.config();
    }
    config() {
        (0, cloudinary_2.executeConfig)();
    }
    uploadImage(imagen) {
        return __awaiter(this, void 0, void 0, function* () {
            //deprecated
            try {
                const reelUpload = yield cloudinary_1.v2.uploader.upload(imagen, {
                    folder: "recetas",
                    unique_filename: true,
                    use_filename: true,
                    access_mode: 'public',
                });
                const imageUrl = reelUpload.url;
                return imageUrl;
            }
            catch (e) {
                console.log(e);
                throw new CloudinaryError_1.CloudinaryError();
            }
        });
    }
}
exports.CloudinaryService = CloudinaryService;
const cloudinaryService = new CloudinaryService();
exports.default = cloudinaryService;
//# sourceMappingURL=CloudinaryService.js.map