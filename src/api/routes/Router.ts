import express from 'express'
import * as userController from "../../controllers/user.controller";
import * as restaurantController from "../../controllers/restaurant.controller";
import * as categoryController from "../../controllers/category.controller";
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
            .put("/restaurants/:restaurantId", authenticatedPartner, restaurantController.editRest)
            .delete("/restaurants/:restaurantId", authenticatedPartner, restaurantController.deleteRest)
            //.get("/restaurants/near", authenticated, sesionController.loginUser)
        
            //.post("/restaurants/score", authenticatedClient, sesionController.loginUser)
        
            .get("/restaurants/:restaurantId/categories", authenticated, categoryController.getAll)
            .post("/restaurants/:restaurantId/categories", authenticatedPartner, categoryController.add)
            .get("/restaurants/:restaurantId/categories/:categoryId", authenticated, categoryController.getOne)
            .put("/restaurants/:restaurantId/categories/:categoryId", authenticatedPartner, categoryController.edit)
            .delete("/restaurants/:restaurantId/categories/:categoryId", authenticatedPartner, categoryController.deleteCat)
        
            //.post("/restaurants/:restaurantId/categories/:categoryId/meals", authenticatedPartner, sesionController.loginUser)
            //.get("/restaurants/:restaurantId/categories/:categoryId/meals", authenticated, sesionController.loginUser)
            //.get("/restaurants/:restaurantId/categories/:categoryId/meals/:mealId", authenticated, sesionController.loginUser)
            //.put("/restaurants/:restaurantId/categories/:categoryId/meals/:mealId", authenticatedPartner, sesionController.loginUser)
            //.delete("/restaurants/:restaurantId/categories/:categoryId/meals/:mealId", authenticatedPartner, sesionController.loginUser)
    }

}

const Router: Routes = new Routes(); 
export default Router.Router

