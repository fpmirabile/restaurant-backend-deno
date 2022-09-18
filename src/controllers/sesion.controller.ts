import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { login, loginSSO, register } from "../service/user/user.service.ts";


export const loginUser = async ({ request, response }: Context) => {
    const body = await request.body().value;

    response.body = {
      data: await login(body.email, body.password),
    };
    response.status = 200;
  };

export const loginUserSSO = async ({ request, response }: Context) => {
    const body = await request.body().value;

    response.body = {
      data: await loginSSO(body.email, body.idToken),
    };
    response.status = 200;
  };

export const registerUser = async ({ request, response }: Context) => {
    const body = await request.body().value;

    response.body = {
      data: await register(body),
    };
    response.status = 200;
  };