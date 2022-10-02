import { Restaurant } from "../../models/index.ts";

export const save = async (restaurant: any) => {
    await Restaurant.create(restaurant)

  };
