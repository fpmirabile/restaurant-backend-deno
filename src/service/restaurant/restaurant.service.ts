import { AppDataSource } from "../../config/database";
import { RestaurantDTO } from "../../dto/restaurant/restaurant.dto";
import { RestaurantNotExistsError } from "../../error/restaurant/RestaurantNotExistsError";
import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { newTime } from "../../interfaces/restaurant/times.interface";
import { FavoriteBuilder } from "../../model/builder/favorite.builder";
import { RestaurantBuilder } from "../../model/builder/restaurant.builder";
import { Favorite, OpenDay, PhotoRestaurant, Restaurant, User } from "../../model/models";
import cloudinaryService from "../cloudinary/CloudinaryService";
import { getStars } from "./stars.service";

export const addRestaurant = async (
  restaurant: newRestaurant,
  userId: number
) => {
  let userRepository = AppDataSource.getRepository(User);
  const userBD = await userRepository.findOne({ where: { userId: userId } });
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const newRestaurant = new RestaurantBuilder()
    .withNewRestaurant(restaurant)
    .withStatus("OPERATIVO")
    .withUser(userBD)
    .build();

  const restaurantBD = await restaurantRepository.save(newRestaurant);

  savePhotosUrls(restaurant.images, restaurantBD);
  saveOpenDays(restaurant.openDays, restaurantBD);
};

export const editRestaurant = async (
  restaurantId: number,
  restaurant: newRestaurant,
  userId: number
) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  let restaurantBD = await restaurantRepository.findOne({
    where: {
      restaurantId: restaurantId,
      user: { userId: userId },
    },
  });

  if (!restaurantBD) {
    throw new RestaurantNotExistsError();
  }

  const newRestaurant = new RestaurantBuilder()
    .withRestaurant(restaurantBD)
    .withNewRestaurant(restaurant)
    .build();

  await restaurantRepository.save(newRestaurant);

  if (restaurant.images) {
    let photoRepository = AppDataSource.getRepository(PhotoRestaurant);
    photoRepository.delete({ restaurant: { restaurantId: restaurantId } });
    savePhotosUrls(restaurant.images, restaurantBD);
  }

  if (restaurant.openDays) {
    let OpenDayRepository = AppDataSource.getRepository(OpenDay);
    OpenDayRepository.delete({ restaurant: { restaurantId: restaurantId } });
    saveOpenDays(restaurant.openDays, restaurantBD);
  }
};

const savePhotosUrls = async (photos: string[], restaurant: Restaurant) => {
  if (photos) {
    let photoRepository = AppDataSource.getRepository(PhotoRestaurant);

    for (let i = 0; i < photos.length; i++) {
      let url = await cloudinaryService.uploadImage(photos[i]);
      photoRepository.save(new PhotoRestaurant(url, restaurant));
    }
  }
};

const saveOpenDays = (openDays: newTime[], restaurant: Restaurant) => {
  if (openDays) {
    let OpenDayRepository = AppDataSource.getRepository(OpenDay);

    for (let i = 0; i < openDays.length; i++) {
      OpenDayRepository.save(new OpenDay(openDays[i].day, restaurant, openDays[i].openTime, openDays[i].closeTime, openDays[i].open));
    }
  }
};

export const getAllRestaurants = async (userId:number) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const restaurantsDTO = []

  let restaurants:Restaurant[] = await restaurantRepository
    .createQueryBuilder("r")
    .innerJoinAndSelect("r.user", "u")
    .leftJoinAndSelect("r.photos", "p")
    .leftJoinAndSelect("r.openDays", "o")
    .where("u.userId = :userId", {userId: userId})
    .getMany();

  if(!restaurants || restaurants.length ==0){
    throw new RestaurantNotExistsError();
  }
  
  for(let i=0; i<restaurants.length; i++){
    const stars = await getStars(restaurants[i].restaurantId)
    restaurantsDTO[i] = new RestaurantDTO(restaurants[i], stars, await isFavorite(restaurants[i].restaurantId, userId))
  }

  return restaurantsDTO;
};

export const getOneRestaurant = async (restaurantId: number, userId:number) => {

  const restaurant = await getRestaurantById(restaurantId);
  const stars = await getStars(restaurant.restaurantId)

  return new RestaurantDTO(restaurant, stars, await isFavorite(restaurant.restaurantId, userId));
};

export const getRestaurantById = async (restaurantId: number) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const restaurant = await restaurantRepository
    .createQueryBuilder("r")
    .innerJoinAndSelect("r.user", "u")
    .leftJoinAndSelect("r.photos", "p")
    .leftJoinAndSelect("r.openDays", "o")
    .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
    .getOne();

  if (!restaurant || restaurant === undefined) {
    throw new RestaurantNotExistsError();
  }

  return restaurant;
}

export const deleteRestaurant = async (
  restaurantId: number,
  userId: number
) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);
  let restaurantBD = await restaurantRepository.findOne({
    where: {
      restaurantId: restaurantId,
      user: { userId: userId },
    },
  });

  if (!restaurantBD) {
    throw new RestaurantNotExistsError();
  }

  const newRestaurant = new RestaurantBuilder()
    .withRestaurant(restaurantBD)
    .withStatus("ELIMINADO")
    .build();

  await restaurantRepository.save(newRestaurant);
};

export const addFavorite = async (
  restaurantId: number,
  userId: number
) => {
  let favoriteRepository = AppDataSource.getRepository(Favorite);
  let favorite = await favoriteRepository.findOne({
    where:{
      restaurant:{restaurantId:restaurantId},
      user:{userId:userId}
    }
  })

  if(favorite){
    favorite.favorite = !favorite.favorite
  }else{
    let userRepository = AppDataSource.getRepository(User); 
    const userBD = await userRepository.findOne({ where: { userId: userId } });
    const restaurant = await getRestaurantById(restaurantId)

    favorite = new FavoriteBuilder()
      .withFavorite(true)
      .withRestaurant(restaurant)
      .withUser(userBD)
      .build()
  }

  favoriteRepository.save(favorite)

};

const isFavorite = async (
  restaurantId: number,
  userId: number
) => {
  let favoriteRepository = AppDataSource.getRepository(Favorite);
  let favorite = await favoriteRepository.findOne({
    where:{
      restaurant:{restaurantId:restaurantId},
      user:{userId:userId}
    }
  })

  if(favorite){
    return favorite.favorite
  }else{
    return false
  }


};