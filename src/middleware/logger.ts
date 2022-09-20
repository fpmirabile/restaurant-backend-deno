// deno-lint-ignore-file
import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";

export const logger = async (ctx: Context, next: () => any) => {
  await next();

  try{
    const body = await ctx.request.body().value;
    const params = body ? `with params ${JSON.stringify(body)}` : "";
    console.log(`${ctx.request.method} request to ${ctx.request.url} ${params}`);
  }catch(e){
    
  }
  
  
  
};