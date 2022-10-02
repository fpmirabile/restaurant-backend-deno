// deno-lint-ignore-file
import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { errorHandler } from "../middleware/errorHandler.ts";
import { addRestaurant } from "../service/restaurant/restaurant.service.ts";

export const addNewRest = async (ctx: Context) => {
    const body = await ctx.request.body().value;

    try{
      await addRestaurant(body)
      ctx.response.status = 200;
    }catch(e){
      errorHandler(e, ctx)
    }
  };