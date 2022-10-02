import { newRestaurant } from "../../interfaces/restaurant.interface.ts";
import { RestaurantBuilder } from "../../models/builder/RestaurantBuilder.ts";
import { save } from "../../repositories/restaurant/restaurant.repository.ts";

export const addRestaurant = async (restaurant:newRestaurant) => {

    const newRestaurant = new RestaurantBuilder()
         .withNewRestaurant(restaurant)
         .withStatus("OPERATIVO")
         .build()
 
     await save(newRestaurant)
 
 };