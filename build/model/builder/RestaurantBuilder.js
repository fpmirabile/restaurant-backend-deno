"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantBuilder = void 0;
const Models_1 = require("../Models");
class RestaurantBuilder {
    constructor() {
        this.build = () => {
            const restaurant = new Models_1.Restaurant();
            restaurant.restaurantId = this.restaurantId;
            restaurant.name = this.name;
            restaurant.street = this.street;
            restaurant.streetNumber = this.streetNumber;
            restaurant.neighborhood = this.neighborhood;
            restaurant.place = this.place;
            restaurant.state = this.state;
            restaurant.lat = this.lat;
            restaurant.lon = this.lon;
            restaurant.openTime = this.openTime;
            restaurant.closeTime = this.closeTime;
            restaurant.status = this.status;
            restaurant.user = this.user;
            return restaurant;
        };
        this.withNewRestaurant = (newRestaurant) => {
            this.name = newRestaurant.name;
            this.street = newRestaurant.street;
            this.streetNumber = newRestaurant.streetNumber;
            this.neighborhood = newRestaurant.neighborhood;
            this.place = newRestaurant.place;
            this.state = newRestaurant.state;
            this.lat = newRestaurant.lat;
            this.lon = newRestaurant.lon;
            this.openTime = newRestaurant.openTime;
            this.closeTime = newRestaurant.closeTime;
            return this;
        };
        this.withStatus = (status) => {
            this.status = status;
            return this;
        };
        this.withUser = (user) => {
            this.user = user;
            return this;
        };
    }
}
exports.RestaurantBuilder = RestaurantBuilder;
//# sourceMappingURL=RestaurantBuilder.js.map