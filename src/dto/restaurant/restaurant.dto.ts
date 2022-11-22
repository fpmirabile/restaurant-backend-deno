import { Restaurant } from "../../model/models";
import { OpenDayDTO } from "./openDay.dto";

export class RestaurantDTO {
    id: number;
    name: string;
    address: string;
    ownerId: number;
    lat: number;
    lon: number;
    openDays:OpenDayDTO[] = [];
    photos:string[] = [];
    favorite:boolean;
    stars:number;
    foodType: string;
    priceRange:string
    categories:string[]
    comments:string[]
    open:boolean
  
    constructor(
      restaurant:Restaurant,
      stars:number,
      favorite:boolean
    ) {
      this.id = restaurant.restaurantId;
      this.name = restaurant.name;
      this.address = restaurant.street + " " + restaurant.streetNumber;
      this.ownerId = restaurant.user.userId;
      this.lat = restaurant.lat;
      this.lon = restaurant.lon;
      this.stars = stars;
      this.favorite = favorite;
      this.foodType = restaurant.foodType;
      this.priceRange = restaurant.priceRange;
      this.open = restaurant.open;
      if(restaurant.openDays){
        for(let i=0; i<restaurant.openDays.length; i++){
            this.openDays[i] = new OpenDayDTO(restaurant.openDays[i]);
        }
      }
      if(restaurant.photos){
        for(let i=0; i<restaurant.photos.length; i++){
            this.photos[i] = restaurant.photos[i].url;
        }
      }
        

    }
  }
  