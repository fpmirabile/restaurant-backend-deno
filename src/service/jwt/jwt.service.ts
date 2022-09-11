import { IJwtUnsigned } from "../../interfaces/jwt/IJwtUnsigned.ts";
import { create } from "https://deno.land/x/djwt@v2.2/mod.ts"
import { JwtSignedDTO } from "../../dto/user/JwtSignedDTO.ts";

const jwtSecret: string | undefined = Deno.env.get("JWT_TOKEN_SECRET") || "La concha de tu madre DENO"

export const createJWT = async (signObject: IJwtUnsigned): Promise<JwtSignedDTO> => {

    if (!jwtSecret) {
        throw new Error();
      }

    let jwt = await create({ alg: "HS512", typ: "JWT" }, { userId: signObject.userId, role: signObject.role }, jwtSecret)
    let refreshToken = await create({ alg: "HS512", typ: "JWT" }, { userId: signObject.userId, role: signObject.role }, jwtSecret)

    return {token: jwt, refreshToken: refreshToken}

}