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
            .post("/restaurant", authenticatedPartner, restaurantController.addNewRest)
            .get("/restaurant/:restaurantId", authenticated, restaurantController.getOne)
            .put("/restaurant/:restaurantId", authenticatedPartner, restaurantController.editRest)
            .delete("/restaurant/:restaurantId", authenticatedPartner, restaurantController.deleteRest)


            .put("/restaurant/:restaurantId/favorites", authenticatedClient, restaurantController.editFavorite)
            .post("/restaurant/:restaurantId/stars", authenticatedClient, starsController.add)
            .get("/restaurant/:restaurantId/comments", authenticated, starsController.comments)
            .get("/restaurants/near/:lat/:lon", authenticated, restaurantController.getNear)
        
            .get("/restaurant/:restaurantId/categories", authenticated, categoryController.getAll)
            .post("/restaurant/:restaurantId/category", authenticatedPartner, categoryController.add)
            .get("/restaurant/:restaurantId/category/:categoryId", authenticated, categoryController.getOne)
            .put("/restaurant/:restaurantId/category/:categoryId", authenticatedPartner, categoryController.edit)
            .delete("/restaurant/:restaurantId/category/:categoryId", authenticatedPartner, categoryController.deleteCat)
        
            .post("/restaurant/category/:categoryId/meal", authenticatedPartner, mealController.add)
            .get("/restaurant/category/:categoryId/meals", authenticated, mealController.getAll)
            .get("/restaurant/category/meal/:mealId", authenticated, mealController.getOne)
            .put("/restaurant/category/meal/:mealId", authenticatedPartner, mealController.edit)
            .delete("/restaurant/category/meal/:mealId", authenticatedPartner, mealController.deleteM)
    }

}

const Router: Routes = new Routes(); 
export default Router.Router

