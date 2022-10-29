import { Meal } from "../../model/Models";

export class MealDTO{
    id:number;
    name:string;
    price:number;
    images:string[] = [];
    ingredients:string[] = [];
    suitableVegan:boolean;
    suitableCeliac:boolean;

    constructor(meal:Meal){
        this.id = meal.mealId
        this.name = meal.name
        this.price = meal.price
        this.suitableVegan = meal.suitableVegan
        this.suitableCeliac = meal.suitableCeliac

        if(meal.ingredients){
            for(let i =0; i< meal.ingredients.length; i++){
                this.ingredients[i] = meal.ingredients[i].name
            }
        }
        
        if(meal.images){
            for(let i =0; i< meal.images.length; i++){
                this.images[i] = meal.images[i].url
            }
        }

    }
}