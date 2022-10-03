import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { Restaurant, User } from "../Models";

export class RestaurantBuilder{
    restaurantId!: number;
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
    user:User;


    build = ():Restaurant => {
        const restaurant = new Restaurant()
        restaurant.restaurantId = this.restaurantId
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
        restaurant.user = this.user
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

    withUser = (user:User) => {
        this.user = user
        return this
    }
}