import { getPartner } from "../../repositories/user/partner.repository.ts";
import { createJWT } from "../jwt/jwt.service.ts";


export const login = async (user:string, password:string) => {
   
    const loggedUser =  await getPartner(user, password);
    console.log(loggedUser.partner_id)
    if(!loggedUser){
        throw new Error("Los datos ingresados son incorrectos");
    }

    return await createJWT({userId: loggedUser.partner_id, role: "PARTNER"})

  };
  