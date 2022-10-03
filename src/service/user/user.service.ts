import { getRepository } from 'typeorm'
import { User } from '../../model/Models';
import bcrypt from 'bcryptjs'
import { InvalidCredentialsError } from '../../error/user/InvalidCredentialsError';
import { IJwtUnsigned } from '../../interfaces/jwt/IJwtUnsigned';
import { jwtService } from '../jwt/JwtService';
import { UserBuilder } from '../../model/builder/user.builder';
import { NewUser } from '../../interfaces/user/user.interface';
import { DifferentPasswordsError } from '../../error/user/DifferentPasswordsError';
import { UserExistsError } from '../../error/user/UserExistsError';
import { UserDTO } from '../../dto/user/UserDTO';



export const login = async (email:string, password:string) => {
    let userRepository = getRepository(User);
    const user= await userRepository.findOne({email: email});

    if (!user) {
        throw new InvalidCredentialsError()
    }

    if(! await bcrypt.compare(password, user.password)){
        throw new InvalidCredentialsError()
    }

    let signObject:IJwtUnsigned = {
        userId: user.userId,
        name: user.name,
        status: user.status,
        identifier: user.identifier,
        photo: user.photo,
        role: user.role
    };

    return await jwtService.createJWT(signObject);

};

export const loginSSO = async (email:string, identifier:string) => {
    let userRepository = getRepository(User);
    //todo VALIDACION CONTRA GOOGLE

    const user =  await getOrCreateLoggedClient(email, identifier)

    let signObject:IJwtUnsigned = {
        userId: user.userId,
        name: user.name,
        status: user.status,
        identifier: user.identifier,
        photo: user.photo,
        role: user.role
    };

    return await jwtService.createJWT(signObject);

};

export const register = async (user:NewUser) => {

    let userRepository = getRepository(User);

   if(user.password != user.confirmPassword){
    throw new DifferentPasswordsError();
   }

   let userBD= await userRepository.findOne({email: user.email, role: "PARTNER"});

   if(userBD){
    if(userBD.status === "OPERATIVO"){
        throw new UserExistsError();
    }else{
        await userRepository.update({userId: userBD.userId}, {status: "OPERATIVO"});
    }
   }else{
        const newUser = new UserBuilder()
            .withNewUser(user)
            .withRole("PARTNER")
            .withStatus("OPERATIVO")
            .withPassword(bcrypt.hashSync(user.password, 8))
            .build()

        await userRepository.save(newUser)
   }

};

const getOrCreateLoggedClient = async (email:string, identifier:string) => {

    let userRepository = getRepository(User);
    
    let loggedClient= await userRepository.findOne({email: email, role: "CLIENT", status:"OPERATIVO"});

    if(!loggedClient){
        loggedClient = new UserBuilder()
            .withEmail(email)
            .withIdentifier(identifier)
            .withRole("CLIENT")
            .build()
        await userRepository.save(loggedClient)
    }else{
        if(loggedClient.status != "OPERATIVO"){
            await userRepository.update({userId: loggedClient.userId}, {status: "OPERATIVO"});
        }
    }

    return loggedClient
}

export const deleteUser = async (userId:number) => {
    let userRepository = getRepository(User);
    await userRepository.update({userId: userId}, {status: "ELIMINADO"});
}

export const getUserById = async (userId: number) => {
    let userRepository = getRepository(User);
    const user = await userRepository.findOne({userId: userId});

    if(!user){
        throw new InvalidCredentialsError();
    }

    return new UserDTO(user.userId, user.name, user.email, user.status, user.role);
}
  