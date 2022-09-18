import { Router, Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import * as todoController from "../controllers/todo.ts";
import * as sesionController from "../controllers/sesion.controller.ts";
import { authenticated } from "../middleware/jwt.validator.ts";

export const router: Router = new Router();



router.get("", (ctx: Context) => {
  ctx.response.body = "Test";
  ctx.response.status = 200;
});

router
  .post("/login", sesionController.loginUser) 
  .post("/login/sso", sesionController.loginUserSSO)
  .post("/register", sesionController.registerUser)
  .delete("/user", authenticated, sesionController.loginUser)
  .post("/user/recovery", sesionController.loginUser)
  .put("/user/password", sesionController.loginUser)
  .put("/user", authenticated, sesionController.loginUser)

  .get("/me", authenticated, sesionController.loginUser)
  .get("/likes", authenticated, sesionController.loginUser)
  .post("/likes", authenticated, sesionController.loginUser)
  .delete("/likes/:likeId", authenticated, sesionController.loginUser)

  .get("/restaurants", authenticated, sesionController.loginUser)
  .post("/restaurants", authenticated, sesionController.loginUser)
  .get("/restaurants/:restaurantId", authenticated, sesionController.loginUser)
  .put("/restaurants/:restaurantId", authenticated, sesionController.loginUser)
  .delete("/restaurants/:restaurantId", authenticated, sesionController.loginUser)
  .get("/restaurants/near", authenticated, sesionController.loginUser)

  .post("/restaurants/score", authenticated, sesionController.loginUser)

  .get("/restaurants/:restaurantId/menus", authenticated, sesionController.loginUser)
  .post("/restaurants/:restaurantId/menus", authenticated, sesionController.loginUser)
  .get("/restaurants/:restaurantId/menus/:menuId", authenticated, sesionController.loginUser)
  .put("/restaurants/:restaurantId/menus/:menuId", authenticated, sesionController.loginUser)
  .delete("/restaurants/:restaurantId/menus/:menuId", authenticated, sesionController.loginUser)

  .post("/restaurants/:restaurantId/menus/:menuId/food", authenticated, sesionController.loginUser)
  .get("/restaurants/:restaurantId/menus/:menuId/food", authenticated, sesionController.loginUser)
  .get("/restaurants/:restaurantId/menus/:menuId/foods/:foodId", authenticated, sesionController.loginUser)
  .put("/restaurants/:restaurantId/menus/:menuId/foods/:foodId", authenticated, sesionController.loginUser)
  .delete("/restaurants/:restaurantId/menus/:menuId/foods/:foodId", authenticated, sesionController.loginUser)
  ;
