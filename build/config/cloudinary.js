"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeConfig = void 0;
const cloudinary_1 = require("cloudinary");
const executeConfig = () => {
    cloudinary_1.v2.config({
        cloud_name: process.env.CLOUD_NAME || "ddtvzm8fj",
        api_key: process.env.CLOUD_API_KEY || "813888581888648",
        api_secret: process.env.CLOUD_SECRET_KEY || "gqbAE0HG_0sI1pY4NumUEScBeiY",
    });
};
exports.executeConfig = executeConfig;
//# sourceMappingURL=cloudinary.js.map