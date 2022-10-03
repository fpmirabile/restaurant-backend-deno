"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("../../controllers/user.controller"));
const restaurantController = __importStar(require("../../controllers/restaurant.controller"));
const auth_1 = require("../middleware/auth");
class Routes {
    constructor() {
        this.Router = express_1.default.Router();
        this.config();
    }
    config() {
        this.Router
            .post("/login", userController.loginUser)
            .post("/login/sso", userController.loginUserSSO)
            .post("/register", userController.registerUser)
            .delete("/users", auth_1.authenticated, userController.deleteUser)
            //.post("/user/recovery", sesionController.loginUser)
            //.put("/user/password", sesionController.loginUser)
            //.put("/user", authenticated, sesionController.loginUser)
            .get("/me", auth_1.authenticated, userController.getLoggedUser)
            //.get("/likes", authenticated, sesionController.loginUser)
            //.post("/likes", authenticated, sesionController.loginUser)
            //.delete("/likes/:likeId", authenticated, sesionController.loginUser)
            .get("/restaurants", auth_1.authenticated, restaurantController.getAll)
            .post("/restaurants", auth_1.authenticatedPartner, restaurantController.addNewRest);
        //.get("/restaurants/:restaurantId", authenticated, sesionController.loginUser)
        //.put("/restaurants/:restaurantId", authenticatedPartner, sesionController.loginUser)
        //.delete("/restaurants/:restaurantId", authenticatedPartner, sesionController.loginUser)
        //.get("/restaurants/near", authenticated, sesionController.loginUser)
        //.post("/restaurants/score", authenticatedClient, sesionController.loginUser)
        //.get("/restaurants/:restaurantId/menus", authenticated, sesionController.loginUser)
        //.post("/restaurants/:restaurantId/menus", authenticatedPartner, sesionController.loginUser)
        //.get("/restaurants/:restaurantId/menus/:menuId", authenticated, sesionController.loginUser)
        //.put("/restaurants/:restaurantId/menus/:menuId", authenticatedPartner, sesionController.loginUser)
        //.delete("/restaurants/:restaurantId/menus/:menuId", authenticatedPartner, sesionController.loginUser)
        //.post("/restaurants/:restaurantId/menus/:menuId/food", authenticatedPartner, sesionController.loginUser)
        //.get("/restaurants/:restaurantId/menus/:menuId/food", authenticated, sesionController.loginUser)
        //.get("/restaurants/:restaurantId/menus/:menuId/foods/:foodId", authenticated, sesionController.loginUser)
        //.put("/restaurants/:restaurantId/menus/:menuId/foods/:foodId", authenticatedPartner, sesionController.loginUser)
        //.delete("/restaurants/:restaurantId/menus/:menuId/foods/:foodId", authenticatedPartner, sesionController.loginUser)
    }
}
const Router = new Routes();
exports.default = Router.Router;
//# sourceMappingURL=Router.js.map