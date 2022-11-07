import express from 'express'
import * as userController from "../../controllers/user.controller";
import * as restaurantController from "../../controllers/restaurant.controller";
import * as categoryController from "../../controllers/category.controller";
import * as mealController from "../../controllers/meal.controller";
import * as starsController from "../../controllers/stars.controller";
import { authenticated, authenticatedClient, authenticatedPartner } from '../middleware/auth';

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
        
            .get("/restaurants", authenticated, restaurantController.getAll)
            .post("/restaurants", authenticatedPartner, restaurantController.addNewRest)
            .get("/restaurants/:restaurantId", authenticated, restaurantController.getOne)
            .put("/restaurants/:restaurantId", authenticatedPartner, restaurantController.editRest)
            .delete("/restaurants/:restaurantId", authenticatedPartner, restaurantController.deleteRest)


            .put("/restaurants/:restaurantId/favorites", authenticatedClient, restaurantController.editFavorite)
            .post("/restaurants/:restaurantId/stars", authenticatedClient, starsController.add)
            .get("/restaurants/:restaurantId/comments", authenticated, starsController.comments)
            //.get("/restaurants/near", authenticated, restaurantController.near)
        
            .get("/restaurants/:restaurantId/categories", authenticated, categoryController.getAll)
            .post("/restaurants/:restaurantId/categories", authenticatedPartner, categoryController.add)
            .get("/restaurants/:restaurantId/categories/:categoryId", authenticated, categoryController.getOne)
            .put("/restaurants/:restaurantId/categories/:categoryId", authenticatedPartner, categoryController.edit)
            .delete("/restaurants/:restaurantId/categories/:categoryId", authenticatedPartner, categoryController.deleteCat)
        
            .post("/restaurants/categories/:categoryId/meals", authenticatedPartner, mealController.add)
            .get("/restaurants/categories/:categoryId/meals", authenticated, mealController.getAll)
            .get("/restaurants/categories/meals/:mealId", authenticated, mealController.getOne)
            .put("/restaurants/categories/meals/:mealId", authenticatedPartner, mealController.edit)
            .delete("/restaurants/categories/meals/:mealId", authenticatedPartner, mealController.deleteM)
    }

}

const Router: Routes = new Routes(); 
export default Router.Router

