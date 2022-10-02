import { newRestaurant } from "../../interfaces/restaurant.interface.ts";
import { Restaurant } from "../index.ts";

export class RestaurantBuilder{
    restaurant_id!: number;
    name!:string;
    street!:string;
    streetNumber!:string;
    neighborhood!:string;
    place!:string;
    state!:string;
    lat!:string;
    lon!:string;
    openDays!:string[];
    openTime!:string;
    closeTime!:string;
    images!:string[];
    status!:string;


    build = ():Restaurant => {
        const restaurant = new Restaurant()
        restaurant.restaurant_id = this.restaurant_id
        restaurant.name = this.name
        restaurant.street = this.street
        restaurant.streetNumber = this.streetNumber
        restaurant.neighborhood = this.neighborhood
        restaurant.place = this.place
        restaurant.state = this.state
        restaurant.lat = this.lat
        restaurant.lon = this.lon
        restaurant.openTime = this.openTime
        restaurant.closeTime = this.closeTime
        restaurant.status = this.status
        return restaurant
    }

    withNewRestaurant = (newRestaurant:newRestaurant) => {
        this.name = newRestaurant.name
        this.street = newRestaurant.street
        this.streetNumber = newRestaurant.streetNumber
        this.neighborhood = newRestaurant.neighborhood
        this.place = newRestaurant.place
        this.state = newRestaurant.state
        this.lat = newRestaurant.lat
        this.lon = newRestaurant.lon
        this.openTime = newRestaurant.openTime
        this.closeTime = newRestaurant.closeTime

        return this
    }

    withStatus = (status:string) => {
        this.status = status
        return this
    }
}