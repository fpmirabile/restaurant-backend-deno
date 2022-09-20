import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { BaseError } from "../error/base.error.ts";


export const errorHandler = (
  error:Error,
  { response }: Context) => {
    if(error instanceof BaseError){
      console.log(error)
      response.status = error.status;
      response.body = {
        message: error.message,
      };
    }else{
      console.log(error)
      response.status = 500;
      response.body = {
        message: "Ocurrio un error inesperado",
      };
    }  
}
