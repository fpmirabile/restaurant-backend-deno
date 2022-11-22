import { newRestaurant } from "../../interfaces/restaurant/restaurant.interface";
import { Restaurant, User } from "../models";

export class RestaurantBuilder {
  restaurantId: number;
  name: string;
  street: string;
  streetNumber: string;
  neighborhood: string;
  place: string;
  state: string;
  lat: number;
  lon: number;
  openDays: string[];
  openTime: string;
  closeTime: string;
  images: string[];
  status: string;
  user: User;
  urlsPhotos: string[];
  foodType: string;
  priceRange:string;
  open:boolean;

  constructor(){
    this.open = true
  }

  build = (): Restaurant => {
    const restaurant = new Restaurant();
    restaurant.restaurantId = this.restaurantId;
    restaurant.name = this.name;
    restaurant.street = this.street;
    restaurant.streetNumber = this.streetNumber;
    restaurant.neighborhood = this.neighborhood;
    restaurant.place = this.place;
    restaurant.state = this.state;
    restaurant.lat = this.lat;
    restaurant.lon = this.lon;
    restaurant.status = this.status;
    restaurant.user = this.user;
    restaurant.foodType = this.foodType;
    restaurant.priceRange = this.priceRange;
    restaurant.open = this.open;

    return restaurant;
  };

  withNewRestaurant = (newRestaurant: newRestaurant) => {
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
    if (newRestaurant.foodType) {
      this.foodType = newRestaurant.foodType;
    }
    if (newRestaurant.priceRange) {
      this.priceRange = newRestaurant.priceRange;
    }

    return this;
  };

  withRestaurant = (restaurant: Restaurant) => {
    this.name = restaurant.name;
    this.street = restaurant.street;
    this.streetNumber = restaurant.streetNumber;
    this.neighborhood = restaurant.neighborhood;
    this.place = restaurant.place;
    this.state = restaurant.state;
    this.lat = restaurant.lat;
    this.lon = restaurant.lon;
    this.restaurantId = restaurant.restaurantId;
    this.user = restaurant.user;
    this.status = restaurant.status;
    this.foodType = restaurant.foodType;
    this.priceRange = restaurant.priceRange;
    this.open = restaurant.open;

    return this;
  };

  withStatus = (status: string) => {
    this.status = status;
    return this;
  };

  withUser = (user: User) => {
    this.user = user;
    return this;
  };
}
