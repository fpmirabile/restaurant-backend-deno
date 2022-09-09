import { Router, Context } from "https://deno.land/x/oak/mod.ts";
import * as todoController from "../controllers/todo.ts";
import { getTest } from "../repositories/test/test.repository.ts";

export const router: Router = new Router();

router.get("", async (ctx: Context) => {
  ctx.response.body = "Test";
  console.log(await getTest());
  ctx.response.status = 200;
});

router
  .get("/todos", todoController.getAllTodos)
  .post("/todos", todoController.createTodo)
  .get("/todos/:id", todoController.getTodoById)
  .put("/todos/:id", todoController.updateTodoById)
  .delete("/todos/:id", todoController.deleteTodoById);
