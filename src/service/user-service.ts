import { User } from "../models/user/user.ts";

export const getUser = async () => {
  const user = await User.select("usuario_id").get();
  return user;
};
