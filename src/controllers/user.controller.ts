// deno-lint-ignore-file
import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { errorHandler } from "../middleware/errorHandler.ts";
import { login, loginSSO, register, deleteUser as deleteById } from "../service/user/user.service.ts";


export const loginUser = async (ctx: Context) => {
    const body = await ctx.request.body().value;

    try{
      ctx.response.body = await login(body.email, body.password)
      ctx.response.status = 200;
    }catch(e){
      errorHandler(e, ctx)
    }
    
  };

export const loginUserSSO = async (ctx: Context) => {
    const body = await ctx.request.body().value;

    ctx.response.body = await loginSSO(body.email, body.idToken)
    ctx.response.status = 200;
  };

export const registerUser = async (ctx: Context) => {
    const body = await ctx.request.body().value;

    try{
      await register(body)
      
      ctx.response.status = 200;
    }catch(e){
      errorHandler(e, ctx)
    }
  };

  export const deleteUser = async (ctx: Context) => {
    try{
      const userId = (ctx.request as any).user.userId;      
      await deleteById(userId);
      ctx.response.status = 200;
    }catch(e){
      errorHandler(e, ctx)
    }
  };