import { Category } from "../../model/Models";
import { MealDTO } from "./meal.dto";

export class CategoryDTO{
    id:number;
    name:string;
    items:MealDTO[] = [];

    constructor(category:Category){

        this.id = category.categoryId
        this.name = category.name

        if(category.meals){
            for(let i =0; i< category.meals.length; i++){
                this.items[i] = new MealDTO(category.meals[i])
            }
        }
        

    }
}