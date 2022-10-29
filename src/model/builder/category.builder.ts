import { Category, Restaurant, User } from "../models";

export class CategoryBuilder{
    categoryId:number
    restaurant: Restaurant;
    name!:string;
    status!:string;

    build = ():Category => {
        const category = new Category()
        category.categoryId = this.categoryId
        category.restaurant = this.restaurant
        category.name = this.name
        category.status = this.status
        return category
    }

    withName(name:string){
        this.name = name
        return this
    }

    withRestaurant(restaurant:Restaurant){
        this.restaurant = restaurant
        return this
    }

    withCategoryId(categoryId:number){
        this.categoryId = categoryId
        return this
    }

    withStatus(status:string){
        this.status = status
        return this
    }

        
}