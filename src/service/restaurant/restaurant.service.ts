import { Brackets } from "typeorm";
import { AppDataSource } from "../../config/database";
import { RestaurantDTO } from "../../dto/restaurant/restaurant.dto";
import { RestaurantNotExistsError } from "../../error/restaurant/RestaurantNotExistsError";
import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { newTime } from "../../interfaces/restaurant/times.interface";
import { FavoriteBuilder } from "../../model/builder/favorite.builder";
import { RestaurantBuilder } from "../../model/builder/restaurant.builder";
import {
  Favorite,
  OpenDay,
  PhotoRestaurant,
  Restaurant,
  User,
} from "../../model/models";
import cloudinaryService from "../cloudinary/CloudinaryService";
import { getCategories } from "../menu/category.service";
import { getComments, getStars } from "./stars.service";

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
    .withTemporaryOpen(true)
    .withUser(userBD)
    .build();

  const restaurantBD = await restaurantRepository.save(newRestaurant);

  savePhotosUrls(restaurant.images, restaurantBD);
  saveOpenDays(restaurant.openDays, restaurantBD);

  return restaurantBD;
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

export const changeOpen = async (restaurantId: number, userId: number) => {
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

  restaurantBD.open = !restaurantBD.open;

  await restaurantRepository.save(restaurantBD);
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
      OpenDayRepository.save(
        new OpenDay(
          openDays[i].day,
          restaurant,
          openDays[i].openTime,
          openDays[i].closeTime,
          openDays[i].open
        )
      );
    }
  }
};

export const getAllRestaurants = async (userId: number) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const restaurantsDTO = [];

  let restaurants: Restaurant[] = await restaurantRepository
    .createQueryBuilder("r")
    .innerJoinAndSelect("r.user", "u")
    .leftJoinAndSelect("r.photos", "p")
    .leftJoinAndSelect("r.openDays", "o")
    .where("u.userId = :userId", { userId: userId })
    .getMany();

  if (!restaurants || restaurants.length == 0) {
    return [];
  }

  for (let i = 0; i < restaurants.length; i++) {
    const stars = await getStars(restaurants[i].restaurantId);
    restaurantsDTO[i] = new RestaurantDTO(
      restaurants[i],
      stars,
      await isFavorite(restaurants[i].restaurantId, userId)
    );
  }

  return restaurantsDTO;
};

export const getOneRestaurant = async (
  restaurantId: number,
  userId: number
) => {
  const restaurant = await getRestaurantById(restaurantId);
  const stars = await getStars(restaurant.restaurantId);

  const categories = await getCategories(restaurantId);
  const comments = await getComments(restaurantId);

  const restaurantDTO = new RestaurantDTO(
    restaurant,
    stars,
    await isFavorite(restaurant.restaurantId, userId)
  );
  restaurantDTO.categories = categories;
  restaurantDTO.comments = comments;

  return restaurantDTO;
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
};

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

export const addFavorite = async (restaurantId: number, userId: number) => {
  let favoriteRepository = AppDataSource.getRepository(Favorite);
  let favorite = await favoriteRepository.findOne({
    where: {
      restaurant: { restaurantId: restaurantId },
      user: { userId: userId },
    },
  });

  if (favorite) {
    favorite.favorite = !favorite.favorite;
  } else {
    let userRepository = AppDataSource.getRepository(User);
    const userBD = await userRepository.findOne({ where: { userId: userId } });
    const restaurant = await getRestaurantById(restaurantId);

    favorite = new FavoriteBuilder()
      .withFavorite(true)
      .withRestaurant(restaurant)
      .withUser(userBD)
      .build();
  }

  favoriteRepository.save(favorite);
};

const isFavorite = async (restaurantId: number, userId: number) => {
  let favoriteRepository = AppDataSource.getRepository(Favorite);
  let favorite = await favoriteRepository.findOne({
    where: {
      restaurant: { restaurantId: restaurantId },
      user: { userId: userId },
    },
  });

  if (favorite) {
    return favorite.favorite;
  } else {
    return false;
  }
};

export type Filter = {
  foodType?: string;
  stars?: number;
  priceRange?: string;
};
export const getNearRestaurants = async (
  lon: number,
  lat: number,
  userId: number,
  near: number,
  filters?: Filter
) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  if (!near) {
    near = 100;
  }
  console.log("Distancia filtrada: " + near);

  let distances = await restaurantRepository.query(
    "select * from (SELECT restaurant_id, ( 3959 * acos( cos( radians(" +
      lat +
      ") ) * cos( radians( lat ) ) * cos( radians( lon ) - radians(" +
      lon +
      ") ) + sin( radians(" +
      lat +
      ") ) * sin( radians( lat ) ) ) ) AS distance " +
      'from public."RESTAURANTS") as t ' +
      "where t.distance <= " + near 
  );

  let ids = [];
  let restaurantsDTO = [];
  let restaurants: Restaurant[];

  for (let i = 0; i < distances.length; i++) {
    ids[i] = distances[i].restaurant_id;
  }

  let query = restaurantRepository
    .createQueryBuilder("r")
    .innerJoinAndSelect("r.user", "u")
    .leftJoinAndSelect("r.photos", "p")
    .leftJoinAndSelect("r.openDays", "o")
    .whereInIds(ids);

    if(filters.foodType){
      query = query.andWhere("r.foodType = :foodType", {foodType: filters.foodType})
    }
    if(filters.priceRange){
      query = query.andWhere("r.priceRange = :priceRange", {priceRange: filters.priceRange})
    }

    restaurants = await query.getMany();

  if (!restaurants || restaurants.length == 0) {
    return [];
  }

  if(filters.stars){
    let flag = 0;
    for (let i = 0; i < restaurants.length; i++) {
      const stars = await getStars(restaurants[i].restaurantId);
      if(stars === filters.stars){
        restaurantsDTO[flag] = new RestaurantDTO(
          restaurants[i],
          stars,
          await isFavorite(restaurants[i].restaurantId, userId)
        );

        flag++;
      } 
    }
  }else{
    for (let i = 0; i < restaurants.length; i++) {
      const stars = await getStars(restaurants[i].restaurantId);
      restaurantsDTO[i] = new RestaurantDTO(
        restaurants[i],
        stars,
        await isFavorite(restaurants[i].restaurantId, userId)
      );
    }
  }
  
  return restaurantsDTO;
};

export const getFavoritesRestaurants = async (userId: number) => {
  let favoriteRepository = AppDataSource.getRepository(Favorite);

  let restaurantsDTO = [];

  let favorites: Favorite[] = await favoriteRepository
    .createQueryBuilder("f")
    .innerJoinAndSelect("f.restaurant", "r")
    .innerJoinAndSelect("r.user", "u2")
    .innerJoinAndSelect("f.user", "u")
    .leftJoinAndSelect("r.photos", "p")
    .leftJoinAndSelect("r.openDays", "o")
    .where("u.userId = :userId", { userId: userId })
    .andWhere("f.favorite = :favorite", {favorite: true})
    .getMany();

  if (!favorites || favorites.length == 0) {
    throw new RestaurantNotExistsError();
  }

  for (let i = 0; i < favorites.length; i++) {
    const stars = await getStars(favorites[i].restaurant.restaurantId);
    restaurantsDTO[i] = new RestaurantDTO(favorites[i].restaurant, stars, true);
  }

  return restaurantsDTO;
};
