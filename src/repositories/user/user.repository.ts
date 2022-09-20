import { User } from "../../models/user/user.ts";

export const getUser = async (user:string, password:string):Promise<User> => {
    return await User.select()
        .where('email', user)
        .where('password', password)
        .first();

  };

export const getClientBy = async (email:string, role:string):Promise<User> => {
    return await User.select()
        .where('email', email)
        .where('role', role)
        .first();

  };

  export const save = async (user: any) => {
    await User.create(user)

  };

  export const deleteById = async (id: number) => {
    await User.deleteById(id)

  };
  