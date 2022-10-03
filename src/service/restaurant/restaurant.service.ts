import { concat } from "lodash";
import { getRepository } from "typeorm";
import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { RestaurantBuilder } from "../../model/builder/RestaurantBuilder";
import { Restaurant, User } from "../../model/Models";

export const addRestaurant = async (restaurant:newRestaurant, userId:number) => {

    let userRepository = getRepository(User);
    const userBD = await userRepository.findOne({userId: userId});
    const restaurantRepository = getRepository(Restaurant)
    
    //TODO Agregar FOTOS
    //TODO Agregar Dias Apertura
    const newRestaurant = new RestaurantBuilder()
         .withNewRestaurant(restaurant)
         .withStatus("OPERATIVO")
         .withUser(userBD)
         .build()
 
     await restaurantRepository.save(newRestaurant)
 
 };

 export const getAllRestaurants = async () => {

    const restaurantRepository = getRepository(Restaurant)

    return await restaurantRepository.createQueryBuilder('r')
        .select('r.restaurantId', "id")
        .addSelect('r.name', "name")
        .addSelect("CONCAT(r.street, ' ', r.streetNumber)", "address")
        .addSelect('u.userId', "ownerId")
        .addSelect('r.lat', "lat")
        .addSelect('r.lon', "lon")
        .innerJoin('r.user', 'u')
        .getRawMany()
 
 };