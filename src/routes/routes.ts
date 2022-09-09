import { Router, Context } from "https://deno.land/x/oak/mod.ts";
import * as todoController from "../controllers/todo.ts";

export const router: Router = new Router();

router.get("", (ctx: Context) => {
  ctx.response.body = "Test";
  ctx.response.status = 200;
});

router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById)
  .get("/usuario", todoController.getUserById);
