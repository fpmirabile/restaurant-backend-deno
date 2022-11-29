import { Category } from "../../model/models";
import { MealDTO } from "./meal.dto";

export class CategoryDTO {
  id: number;
  name: string;
  items: MealDTO[] = [];

  constructor(category: Category) {
    this.id = category.categoryId;
    this.name = category.name;

    if (category.meals) {
      for (let i = 0; i < category.meals.length; i++) {
        const meal = category.meals[i];
        if (meal.status === "OPERATIVO") {
          this.items[i] = new MealDTO(category.meals[i]);
        }
      }
    }
  }
}
