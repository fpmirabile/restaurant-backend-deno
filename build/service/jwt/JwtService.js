"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtService = exports.jwtSecret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const JWTSecretError_1 = require("../../error/auth/JWTSecretError");
const JWTCreateError_1 = require("../../error/auth/JWTCreateError");
exports.jwtSecret = process.env.JWT_SECRET || 'Me cago en la concha de tu madre';
const tokenExpirationInSeconds = 86400; // 24 HOURS
class JwtService {
    createJWT(signObject) {
        if (!exports.jwtSecret) {
            throw new JWTSecretError_1.JWTSecretError();
        }
        try {
            const refreshId = signObject.userId + exports.jwtSecret;
            const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            const token = jsonwebtoken_1.default.sign(signObject, exports.jwtSecret, {
                expiresIn: tokenExpirationInSeconds,
            });
            return {
                token,
                refreshToken: hash,
            };
        }
        catch (err) {
            throw new JWTCreateError_1.JWTCreateError();
        }
    }
}
exports.jwtService = new JwtService();
//# sourceMappingURL=JwtService.js.map