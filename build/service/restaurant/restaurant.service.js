"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRestaurant = exports.getOneRestaurant = exports.getAllRestaurants = exports.editRestaurant = exports.addRestaurant = void 0;
const typeorm_1 = require("typeorm");
const RestaurantNotExistsError_1 = require("../../error/restaurant/RestaurantNotExistsError");
const RestaurantBuilder_1 = require("../../model/builder/RestaurantBuilder");
const Models_1 = require("../../model/Models");
const CloudinaryService_1 = __importDefault(require("../cloudinary/CloudinaryService"));
const addRestaurant = (restaurant, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    const userBD = yield userRepository.findOne({ userId: userId });
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    const newRestaurant = new RestaurantBuilder_1.RestaurantBuilder()
        .withNewRestaurant(restaurant)
        .withStatus("OPERATIVO")
        .withUser(userBD)
        .build();
    const restaurantBD = yield restaurantRepository.save(newRestaurant);
    savePhotosUrls(restaurant.images, restaurantBD);
    saveOpenDays(restaurant.openDays, restaurantBD);
});
exports.addRestaurant = addRestaurant;
const editRestaurant = (restaurantId, restaurant, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    let restaurantBD = yield restaurantRepository.findOne({ restaurantId: restaurantId, user: { userId: userId } });
    if (!restaurantBD) {
        throw new RestaurantNotExistsError_1.RestaurantNotExistsError();
    }
    const newRestaurant = new RestaurantBuilder_1.RestaurantBuilder()
        .withRestaurant(restaurantBD)
        .withNewRestaurant(restaurant)
        .build();
    yield restaurantRepository.save(newRestaurant);
    if (restaurant.images) {
        let photoRepository = (0, typeorm_1.getRepository)(Models_1.PhotoRestaurant);
        photoRepository.delete({ restaurant: { restaurantId: restaurantId } });
        savePhotosUrls(restaurant.images, restaurantBD);
    }
    if (restaurant.openDays) {
        let OpenDayRepository = (0, typeorm_1.getRepository)(Models_1.OpenDay);
        OpenDayRepository.delete({ restaurant: { restaurantId: restaurantId } });
        saveOpenDays(restaurant.openDays, restaurantBD);
    }
});
exports.editRestaurant = editRestaurant;
const savePhotosUrls = (photos, restaurant) => __awaiter(void 0, void 0, void 0, function* () {
    if (photos) {
        let photoRepository = (0, typeorm_1.getRepository)(Models_1.PhotoRestaurant);
        for (let i = 0; i < photos.length; i++) {
            let url = yield CloudinaryService_1.default.uploadImage(photos[i]);
            photoRepository.save(new Models_1.PhotoRestaurant(url, restaurant));
        }
    }
});
const saveOpenDays = (openDays, restaurant) => {
    if (openDays) {
        let OpenDayRepository = (0, typeorm_1.getRepository)(Models_1.OpenDay);
        for (let i = 0; i < openDays.length; i++) {
            OpenDayRepository.save(new Models_1.OpenDay(openDays[i], restaurant));
        }
    }
};
const getAllRestaurants = () => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    return yield restaurantRepository.createQueryBuilder('r')
        .select('r.restaurantId', "id")
        .addSelect('r.name', "name")
        .addSelect("CONCAT(r.street, ' ', r.streetNumber)", "address")
        .addSelect('u.userId', "ownerId")
        .addSelect('r.lat', "lat")
        .addSelect('r.lon', "lon")
        .innerJoin('r.user', 'u')
        .getRawMany();
});
exports.getAllRestaurants = getAllRestaurants;
const getOneRestaurant = (restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    const restaurant = yield restaurantRepository.createQueryBuilder('r')
        .innerJoinAndSelect('r.user', 'u')
        .where("r.restaurantId = :restaurantId", { restaurantId: restaurantId })
        .getOne();
    if (!restaurant || restaurant === undefined) {
        throw new RestaurantNotExistsError_1.RestaurantNotExistsError();
    }
    return {
        id: restaurant.restaurantId,
        name: restaurant.name,
        address: restaurant.street + " " + restaurant.streetNumber,
        ownerId: restaurant.user.userId,
        lat: restaurant.lat,
        lon: restaurant.lon
    };
});
exports.getOneRestaurant = getOneRestaurant;
const deleteRestaurant = (restaurantId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    let restaurantBD = yield restaurantRepository.findOne({ restaurantId: restaurantId, user: { userId: userId } });
    if (!restaurantBD) {
        throw new RestaurantNotExistsError_1.RestaurantNotExistsError();
    }
    const newRestaurant = new RestaurantBuilder_1.RestaurantBuilder()
        .withRestaurant(restaurantBD)
        .withStatus("ELIMINADO")
        .build();
    yield restaurantRepository.save(newRestaurant);
});
exports.deleteRestaurant = deleteRestaurant;
//# sourceMappingURL=restaurant.service.js.map