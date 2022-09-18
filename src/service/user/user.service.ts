import { NewUser } from "../../interfaces/user.interface.ts";
import { User } from "../../models/index.ts";
import { getClientBy, getUser, save } from "../../repositories/user/user.repository.ts";
import { createJWT } from "../jwt/jwt.service.ts";


export const login = async (email:string, password:string) => {
   
    const loggedUser =  await getUser(email, password);

    if(!loggedUser){
        throw new Error("Los datos ingresados son incorrectos");
    }

    return await createJWT(loggedUser)

};

export const loginSSO = async (email:string, identifier:string) => {
   
    //VALIDACION CONTRA GOOGLE

    const loggedUser =  await getLoggedClient(email, identifier)

    return await createJWT(loggedUser)

};

export const register = async (user:NewUser) => {

   if(user.password != user.confirmPassword){
    throw new Error("Las contraseñas no coinciden");
   }

   let userBD = await getClientBy(user.email, "CLIENT")

   if(userBD){
    throw new Error("Ya existe un usuario registrado con el email ingresado");
   }

    await save(user)

};

const getLoggedClient = async (email:string, identifier:string):Promise<User> => {
    
let loggedClient:User = await getClientBy(email, "CLIENT")

if(!loggedClient){
    loggedClient = new User();
    loggedClient.email = email
    loggedClient.identifier = identifier
    loggedClient.role = "CLIENT"
    save(loggedClient)
}

return loggedClient

}
  