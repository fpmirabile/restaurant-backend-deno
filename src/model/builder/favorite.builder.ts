import { Favorite, Restaurant, Stars, User } from "../models";

export class FavoriteBuilder{
    restaurant: Restaurant;
    favorite!:boolean;
    user!:User;

    build = ():Favorite => {
        const favorite = new Favorite(this.user, this.restaurant)
        favorite.favorite = this.favorite
        return favorite
    }

    withFavorite(favorite:boolean){
        this.favorite = favorite
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