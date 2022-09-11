import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { login } from "../service/user/partner.service.ts";

export const loginUser = async ({ request, response }: Context) => {
    const body = await request.body().value;

    response.body = {
      data: await login(body.email, body.password),
    };
    response.status = 200;
  };