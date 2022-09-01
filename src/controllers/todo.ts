import { Context } from "https://deno.land/x/oak/mod.ts";
import {
  helpers,
} from "https://deno.land/x/oak/mod.ts";
import { todos } from "../stubs/todo.ts";
import { Todo } from "../types/todo.ts";

export const getAllTodos = ({ response }: Context) => {
  response.body = {
    success: true,
    data: todos,
  };
  response.status = 200;
};

export const createTodo = async ({ request, response }: Context) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data provided",
    };
    return; // Or next?
  }

  const newTodo: Todo = {
    id: Math.random().toString(),
    // Este as any depende de los modelos que vayamos a usar
    // luego se puede hacer por ejemplo...
    // const userData = (await request.body()).value as CreateUser;
    todo: (body.value as any).todo || "",
    isCompleted: false,
  };
  const data = [...todos, newTodo];
  response.body = {
    success: true,
    data,
  };
  response.status = 200;
};

export const getTodoById = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const todo = todos.find(t => t.id === id);
  ctx.response.body = {
    success: true,
    data: todo,
  };
  ctx.response.status = 200;
};

export const updateTodoById = async () => { };
export const deleteTodoById = () => { };


