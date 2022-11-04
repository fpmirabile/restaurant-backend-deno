import { AppDataSource } from "../../config/database";
import { RestaurantNotExistsError } from "../../error/restaurant/RestaurantNotExistsError";
import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { RestaurantBuilder } from "../../model/builder/restaurant.builder";
import { OpenDay, PhotoRestaurant, Restaurant, User } from "../../model/models";
import cloudinaryService from "../cloudinary/CloudinaryService";

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

const saveOpenDays = (openDays: string[], restaurant: Restaurant) => {
  if (openDays) {
    let OpenDayRepository = AppDataSource.getRepository(OpenDay);

    for (let i = 0; i < openDays.length; i++) {
      OpenDayRepository.save(new OpenDay(openDays[i], restaurant));
    }
  }
};

export const getAllRestaurants = async (userId:number) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  return await restaurantRepository
    .createQueryBuilder("r")
    .select("r.restaurantId", "id")
    .addSelect("r.name", "name")
    .addSelect("CONCAT(r.street, ' ', r.streetNumber)", "address")
    .addSelect("u.userId", "ownerId")
    .addSelect("r.lat", "lat")
    .addSelect("r.lon", "lon")
    .innerJoin("r.user", "u")
    .where("u.userId = :userId", {userId: userId})
    .getRawMany();
};

export const getOneRestaurant = async (restaurantId: number) => {
  const restaurantRepository = AppDataSource.getRepository(Restaurant);

  const restaurant = await restaurantRepository
    .createQueryBuilder("r")
    .innerJoinAndSelect("r.user", "u")
    .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
    .getOne();

  if (!restaurant || restaurant === undefined) {
    throw new RestaurantNotExistsError();
  }

  return {
    id: restaurant.restaurantId,
    name: restaurant.name,
    address: restaurant.street + " " + restaurant.streetNumber,
    ownerId: restaurant.user.userId,
    lat: restaurant.lat,
    lon: restaurant.lon,
  };
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
