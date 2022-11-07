import { Restaurant, Comment, User } from "../models";

export class CommentBuilder{
    restaurant: Restaurant;
    comment!:string;
    user!:User;

    build = ():Comment => {
        const comment = new Comment(this.user, this.restaurant)
        comment.comment = this.comment
        return comment
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