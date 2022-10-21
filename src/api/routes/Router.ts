import express from 'express'
import * as userController from "../../controllers/user.controller";
import * as restaurantController from "../../controllers/restaurant.controller";
import { authenticated, authenticatedPartner } from '../middleware/auth';

class Routes {

    public Router = express.Router()

    constructor() {
        this.config();
    }

    private config(): void {
        this.Router
            .post("/login", userController.loginUser) 
            .post("/login/sso", userController.loginUserSSO)
            .post("/register", userController.registerUser)
            .delete("/users", authenticated, userController.deleteUser)
            //.post("/user/recovery", sesionController.loginUser)
            //.put("/user/password", sesionController.loginUser)
            //.put("/user", authenticated, sesionController.loginUser)
        
            .get("/me", authenticated, userController.getLoggedUser)
            //.get("/likes", authenticated, sesionController.loginUser)
            //.post("/likes", authenticated, sesionController.loginUser)
            //.delete("/likes/:likeId", authenticated, sesionController.loginUser)
        
            .get("/restaurants", authenticated, restaurantController.getAll)
            .post("/restaurants", authenticatedPartner, restaurantController.addNewRest)
            .get("/restaurants/:restaurantId", authenticated, restaurantController.getOne)
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

const Router: Routes = new Routes(); 
export default Router.Router

