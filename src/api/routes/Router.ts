import express from 'express'
import * as userController from "../../controllers/user.controller";
import * as restaurantController from "../../controllers/restaurant.controller";
import * as categoryController from "../../controllers/category.controller";
import * as mealController from "../../controllers/meal.controller";
import * as starsController from "../../controllers/stars.controller";
import * as provinciaController from "../../controllers/provincia.controller";
import { authenticated, authenticatedClient, authenticatedPartner } from '../middleware/auth';

class Routes {

    public Router = express.Router()

    constructor() {
        this.config();
    }

    private config(): void {
        this.Router
            .post("/login", userController.loginUser) 
            .post("/login/refresh",authenticated, userController.refresh) 
            .post("/login/sso", userController.loginUserSSO)
            .post("/register", userController.registerUser)
            .delete("/users", authenticated, userController.deleteUser)
            //.post("/user/recovery", sesionController.loginUser)
            .put("/user/password", userController.recoveryPass)
            //.put("/user", authenticated, sesionController.loginUser)
        
            .get("/me", authenticated, userController.getLoggedUser)
        
            .get("/restaurants", authenticated, restaurantController.getAll)
            .post("/restaurant", authenticatedPartner, restaurantController.addNewRest)
            .get("/restaurant/:restaurantId", authenticated, restaurantController.getOne)
            .put("/restaurant/:restaurantId", authenticatedPartner, restaurantController.editRest)
            .delete("/restaurant/:restaurantId", authenticatedPartner, restaurantController.deleteRest)


            .put("/restaurant/:restaurantId/favorites", authenticatedClient, restaurantController.editFavorite)
            .put("/restaurant/:restaurantId/open", authenticatedPartner, restaurantController.open)
            .get("/restaurants/favorites", authenticatedClient, restaurantController.getFavorites)
            .post("/restaurant/:restaurantId/stars", authenticatedClient, starsController.add)
            .get("/restaurant/:restaurantId/comments", authenticated, starsController.comments)
            .get("/restaurants/near/:lat/:lon/:distance", authenticated, restaurantController.getNear)
        
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

            .get("/provincias", provinciaController.getAllProv)
            .get("/provincia/:provincia/localidades", provinciaController.getLocalidadesByProv)
    }

}

const Router: Routes = new Routes(); 
export default Router.Router

