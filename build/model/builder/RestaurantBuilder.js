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
            if (newRestaurant.name) {
                this.name = newRestaurant.name;
            }
            if (newRestaurant.street) {
                this.street = newRestaurant.street;
            }
            if (newRestaurant.streetNumber) {
                this.streetNumber = newRestaurant.streetNumber;
            }
            if (newRestaurant.neighborhood) {
                this.neighborhood = newRestaurant.neighborhood;
            }
            if (newRestaurant.place) {
                this.place = newRestaurant.place;
            }
            if (newRestaurant.state) {
                this.state = newRestaurant.state;
            }
            if (newRestaurant.lat) {
                this.lat = newRestaurant.lat;
            }
            if (newRestaurant.lon) {
                this.lon = newRestaurant.lon;
            }
            if (newRestaurant.openTime) {
                this.openTime = newRestaurant.openTime;
            }
            if (newRestaurant.closeTime) {
                this.closeTime = newRestaurant.closeTime;
            }
            return this;
        };
        this.withRestaurant = (restaurant) => {
            this.name = restaurant.name;
            this.street = restaurant.street;
            this.streetNumber = restaurant.streetNumber;
            this.neighborhood = restaurant.neighborhood;
            this.place = restaurant.place;
            this.state = restaurant.state;
            this.lat = restaurant.lat;
            this.lon = restaurant.lon;
            this.openTime = restaurant.openTime;
            this.closeTime = restaurant.closeTime;
            this.restaurantId = restaurant.restaurantId;
            this.user = restaurant.user;
            this.status = restaurant.status;
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