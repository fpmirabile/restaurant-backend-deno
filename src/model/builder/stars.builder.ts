import { Restaurant, Stars, User } from "../models";

export class StarsBuilder{
    restaurant: Restaurant;
    stars!:number;
    comment!:string;
    date!:Date;
    user!:User;

    constructor(){
        this.date = new Date()
    }

    build = ():Stars => {
        const stars = new Stars(this.user, this.restaurant)
        stars.stars = this.stars
        stars.comment = this.comment
        stars.date = this.date
        return stars
    }

    withStars(stars:number){
        this.stars = stars
        return this
    }
    
    withComment(comment:string){
        this.comment = comment
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