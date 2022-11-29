import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { AppDataSource } from "../../config/database";
import { InvalidCredentialsError } from "../../error/user/InvalidCredentialsError";
import { IJwtUnsigned } from "../../interfaces/jwt/IJwtUnsigned";
import { jwtService } from "../jwt/JwtService";
import { UserBuilder } from "../../model/builder/user.builder";
import { NewUser } from "../../interfaces/user/user.interface";
import { DifferentPasswordsError } from "../../error/user/DifferentPasswordsError";
import { UserExistsError } from "../../error/user/UserExistsError";
import { UserDTO } from "../../dto/user/UserDTO";
import { User } from "../../model/models";

export const login = async (email: string, password: string) => {
  let userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: email.toLowerCase(),
      status: "OPERATIVO",
      role: "PARTNER"
    },
  });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new InvalidCredentialsError();
  }

  let signObject: IJwtUnsigned = {
    userId: user.userId,
    name: user.name,
    status: user.status,
    identifier: user.identifier,
    photo: user.photo,
    role: user.role,
  };

  return await jwtService.createJWT(signObject);
};

export const loginSSO = async (userEmail: string, idToken: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, email_verified, sub, name, family_name } = ticket.getPayload();
  if (!sub || !email || !email_verified || userEmail !== email) {
    throw new InvalidCredentialsError();
  }
  console.log(email, email_verified, sub);
  const user = await getOrCreateLoggedClient(email, idToken, name, "");

  const signObject: IJwtUnsigned = {
    userId: user.userId,
    name: user.name,
    status: user.status,
    identifier: user.identifier,
    photo: user.photo,
    role: user.role,
  };

  return await jwtService.createJWT(signObject);
};

export const register = async (user: NewUser) => {
  let userRepository = AppDataSource.getRepository(User);

  if (user.password != user.confirmPassword) {
    throw new DifferentPasswordsError();
  }

  let userBD = await userRepository.findOne({
    where: {
      email: user.email,
      role: "PARTNER",
    },
  });

  if (userBD) {
    if (userBD.status === "OPERATIVO") {
      throw new UserExistsError();
    } else {
      await userRepository.update(
        { userId: userBD.userId },
        { status: "OPERATIVO" }
      );
    }
  } else {
    const newUser = new UserBuilder()
      .withNewUser(user)
      .withRole("PARTNER")
      .withStatus("OPERATIVO")
      .withPassword(bcrypt.hashSync(user.password, 8))
      .build();

    await userRepository.save(newUser);
  }
};

const getOrCreateLoggedClient = async (
  email: string,
  identifier: string,
  name: string,
  lastName: string
) => {
  let userRepository = AppDataSource.getRepository(User);

  let loggedClient = await userRepository.findOne({
    where: {
      email: email,
      role: "CLIENT"
    },
  });

  if (!loggedClient) {
    loggedClient = new UserBuilder()
      .withEmail(email)
      .withIdentifier(identifier)
      .withRole("CLIENT")
      .withName(name + " " + lastName)
      .withStatus("OPERATIVO")
      .build();
    await userRepository.save(loggedClient);
  } else {
    if (loggedClient.status != "OPERATIVO") {
      await userRepository.update(
        { userId: loggedClient.userId },
        { status: "OPERATIVO" }
      );
    }
  }

  return loggedClient;
};

export const deleteUser = async (userId: number) => {
  let userRepository = AppDataSource.getRepository(User);
  await userRepository.update({ userId: userId }, { status: "ELIMINADO" });
};

export const getUserById = async (userId: number) => {
  let userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { userId: userId } });

  if (!user) {
    throw new InvalidCredentialsError();
  }

  return new UserDTO(
    user.userId,
    user.name,
    user.email,
    user.status,
    user.role
  );
};

export type newPassword = {
  email:string,
  password:string
}
export const changePassword = async (newPassword: newPassword) => {

  let userRepository = AppDataSource.getRepository(User);
  let user = await userRepository.findOne({
    where: {
      email: newPassword.email,
      role: "PARTNER",
      status: "OPERATIVO"
    },
  });

  if(!user){
    throw new UserExistsError();
  }

  userRepository.update(
    { userId: user.userId },
    { password: bcrypt.hashSync(newPassword.password, 8) }
  )

};
