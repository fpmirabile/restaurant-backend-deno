// deno-lint-ignore-file
import { verify } from "https://deno.land/x/djwt@v2.2/mod.ts";
import { Context } from "https://deno.land/x/oak@v11.1.0/mod.ts";


const jwtSecret: string | undefined = Deno.env.get("JWT_TOKEN_SECRET") || "La concha de tu madre DENO"

export const authenticated = async (ctx: Context, next: () => any) => {
    
    const headers: Headers = ctx.request.headers;
    const authorization = headers.get('Authorization')
    if (!authorization) {
        ctx.response.status = 401;
        return;
    }
    
    const payload = await verify(authorization, jwtSecret, "HS512");
    if (payload){
        (ctx.request as any).user = payload;
        await next();
        return;
    }
    
    ctx.response.status = 401;
    ctx.response.body = {message: 'Invalid jwt token'};

}


