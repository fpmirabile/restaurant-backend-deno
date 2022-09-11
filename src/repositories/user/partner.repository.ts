import { Partner } from "../../models/user/partner.ts";

export const getPartner = async (user:string, password:string):Promise<Partner> => {
    return await Partner.select()
        .where('email', user)
        .where('password', password)
        .first();

  };
  