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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRestaurants = exports.addRestaurant = void 0;
const typeorm_1 = require("typeorm");
const RestaurantBuilder_1 = require("../../model/builder/RestaurantBuilder");
const Models_1 = require("../../model/Models");
const addRestaurant = (restaurant, userId) => __awaiter(void 0, void 0, void 0, function* () {
    let userRepository = (0, typeorm_1.getRepository)(Models_1.User);
    const userBD = yield userRepository.findOne({ userId: userId });
    const restaurantRepository = (0, typeorm_1.getRepository)(Models_1.Restaurant);
    //TODO Agregar FOTOS
    //TODO Agregar Dias Apertura
    const newRestaurant = new RestaurantBuilder_1.RestaurantBuilder()
        .withNewRestaurant(restaurant)
        .withStatus("OPERATIVO")
        .withUser(userBD)
        .build();
    yield restaurantRepository.save(newRestaurant);
});
exports.addRestaurant = addRestaurant;
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
//# sourceMappingURL=restaurant.service.js.map