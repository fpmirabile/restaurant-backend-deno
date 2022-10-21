import { concat } from "lodash";
import { getRepository } from "typeorm";
import { RestaurantNotExistsError } from "../../error/restaurant/RestaurantNotExistsError";
import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { RestaurantBuilder } from "../../model/builder/RestaurantBuilder";
import { OpenDay, PhotoRestaurant, Restaurant, User } from "../../model/Models";
import cloudinaryService from "../cloudinary/CloudinaryService";

export const addRestaurant = async (restaurant:newRestaurant, userId:number) => {

    let userRepository = getRepository(User);
    const userBD = await userRepository.findOne({userId: userId});
    const restaurantRepository = getRepository(Restaurant)
 
    const newRestaurant = new RestaurantBuilder()
         .withNewRestaurant(restaurant)
         .withStatus("OPERATIVO")
         .withUser(userBD)
         .build()
 
    const restaurantBD = await restaurantRepository.save(newRestaurant)

    savePhotosUrls(restaurant.images, restaurantBD)
    saveOpenDays(restaurant.openDays, restaurantBD)
 
 };

 export const editRestaurant = async (restaurantId:number, restaurant:newRestaurant, userId:number) => {

    let userRepository = getRepository(User);
    const userBD = await userRepository.findOne({userId: userId});
    const restaurantRepository = getRepository(Restaurant)
    let restaurantBD = restaurantRepository.findOne({restaurantId : restaurantId})
 
    const newRestaurant = new RestaurantBuilder()
         .withNewRestaurant(restaurant)
         .withStatus("OPERATIVO")
         .withUser(userBD)
         .build()
 
    await restaurantRepository.save(newRestaurant)

    //savePhotosUrls(restaurant.images, restaurantBD)
    //saveOpenDays(restaurant.openDays, restaurantBD)
 
 };

 const savePhotosUrls = async (photos : string[], restaurant: Restaurant) => {
    
    if(photos){
        let photoRepository = getRepository(PhotoRestaurant);

        for(let i=0; i < photos.length; i++){
            let url = await cloudinaryService.uploadImage(photos[i])
            photoRepository.save(new PhotoRestaurant(url, restaurant))
        }
    }
 }

 const saveOpenDays = (openDays : string[], restaurant: Restaurant) => {
    
    if(openDays){
        let OpenDayRepository = getRepository(OpenDay);

        for(let i=0; i < openDays.length; i++){
            OpenDayRepository.save(new OpenDay(openDays[i], restaurant))
        }
    }
 }

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

 export const getOneRestaurant = async (restaurantId:number) => {

    const restaurantRepository = getRepository(Restaurant)

    const restaurant = await restaurantRepository.createQueryBuilder('r')
        .innerJoinAndSelect('r.user', 'u')
        .where("r.restaurantId = :restaurantId", {restaurantId : restaurantId})
        .getOne()

    if(!restaurant || restaurant === undefined){
        throw new RestaurantNotExistsError();
    }

    return {
        id: restaurant.restaurantId,
        name: restaurant.name,
        address: restaurant.street + " " + restaurant.streetNumber,
        ownerId: restaurant.user.userId,
        lat: restaurant.lat,
        lon: restaurant.lon
    }
 
 };