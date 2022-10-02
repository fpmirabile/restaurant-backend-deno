import { UserDTO } from "../../dto/user/UserDTO.ts";
import { DifferentPasswordsError } from "../../error/user/DifferentPasswordsError.ts";
import { InvalidCredentialsError } from "../../error/user/InvalidCredentialsError.ts";
import { UserExistsError } from "../../error/user/UserExistsError.ts";
import { NewUser } from "../../interfaces/user.interface.ts";
import { UserBuilder } from "../../models/builder/UserBuilder.ts";
import { User } from "../../models/index.ts";
import { deleteById, getClientBy, getUser, getUserById as getUserByIdRepository, save } from "../../repositories/user/user.repository.ts";
import { createJWT } from "../jwt/jwt.service.ts";


export const login = async (email:string, password:string) => {
   
    const loggedUser =  await getUser(email, password);

    if(!loggedUser){
        throw new InvalidCredentialsError();
    }

    return await createJWT(loggedUser)

};

export const loginSSO = async (email:string, identifier:string) => {
   
    //todo VALIDACION CONTRA GOOGLE

    const loggedUser =  await getOrCreateLoggedClient(email, identifier)

    return await createJWT(loggedUser)

};

export const register = async (user:NewUser) => {

   if(user.password != user.confirmPassword){
    throw new DifferentPasswordsError();
   }

   const userBD = await getClientBy(user.email, "CLIENT")

   if(userBD){
    throw new UserExistsError();
   }

   const newUser = new UserBuilder()
        .withNewUser(user)
        .withRole("CLIENT")
        .withStatus("OPERATIVO")
        .build()

    await save(newUser)

};

const getOrCreateLoggedClient = async (email:string, identifier:string):Promise<User> => {
    
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

export const deleteUser = async (userId:number) => {
    await deleteById(userId);
}

export const getUserById = async (userId: number) => {
    const user = await getUserByIdRepository(userId);

    if(!user){
        throw new InvalidCredentialsError();
    }

    return new UserDTO(user.user_id, user.name, user.email, user.status, user.role);
}
  