import { Meal, User } from "../Models";
import { newMeal } from "../../interfaces/restaurant/meal.interface";

export class MealBuilder{
    mealId!: number
    name!:string
    price!:number
    suitableVegan!:boolean
    suitableCeliac!:boolean
    status!:string
    ingredients!:string[]
    images!:string[]


    build = ():Meal => {
        const meal = new Meal()
        meal.mealId = this.mealId
        meal.name = this.name
        meal.price = this.price
        meal.suitableVegan = this.suitableVegan
        meal.suitableCeliac = this.suitableCeliac
        return meal
    }

    withNewMeal = (newMeal:newMeal) => {
        this.name = newMeal.name
        this.price = newMeal.price
        this.suitableVegan = newMeal.suitableVegan
        this.suitableCeliac = newMeal.suitableCeliac

        return this
    }

    withMeal = (meal:Meal) => {
        this.name = meal.name
        this.price = meal.price
        this.suitableVegan = meal.suitableVegan
        this.suitableCeliac = meal.suitableCeliac
        this.mealId = meal.mealId

        return this
    }

    withStatus = (status:string) => {
        this.status = status
        return this
    }

}