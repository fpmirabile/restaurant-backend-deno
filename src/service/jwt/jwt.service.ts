import { create } from "https://deno.land/x/djwt@v2.2/mod.ts"
import { JwtSignedDTO } from "../../dto/user/JwtSignedDTO.ts";
import { User } from "../../models/index.ts";

const jwtSecret: string | undefined = Deno.env.get("JWT_TOKEN_SECRET") || "La concha de tu madre DENO"

export const createJWT = async (user: User): Promise<JwtSignedDTO> => {

    if (!jwtSecret) {
        throw new Error();
      }

    const jwtObject = { 
      userId: user.user_id, 
      name: user.name, 
      surname: user.surname, 
      status: user.status, 
      identifier: user.identifier, 
      photo: user.photo, 
      role: user.role 
    }


    const jwt = await create({ alg: "HS512", typ: "JWT" }, jwtObject, jwtSecret)
    const refreshToken = await create({ alg: "HS512", typ: "JWT" }, jwtObject, jwtSecret)

    return {token: jwt, refreshToken: refreshToken}

}