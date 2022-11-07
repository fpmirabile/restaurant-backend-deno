import { Restaurant, Stars, User } from "../models";

export class StarsBuilder{
    restaurant: Restaurant;
    stars!:number;
    user!:User;

    build = ():Stars => {
        const stars = new Stars(this.user, this.restaurant)
        stars.stars = this.stars
        return stars
    }

    withStars(stars:number){
        this.stars = stars
        return this
    }

    withRestaurant(restaurant:Restaurant){
        this.restaurant = restaurant
        return this
    }

    withUser(user:User){
        this.user = user
        return this
    }

        
}