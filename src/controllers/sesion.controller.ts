import { Context, helpers } from "https://deno.land/x/oak/mod.ts";
import { login } from "../service/user/partner.service.ts";

export const loginUser = async ({ request, response }: Context) => {
    const body = await request.body().value;

    response.body = {
      data: await login(body.email, body.password),
    };
    response.status = 200;
  };