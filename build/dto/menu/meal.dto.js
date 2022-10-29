"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealDTO = void 0;
class MealDTO {
    constructor(meal) {
        this.images = [];
        this.ingredients = [];
        this.id = meal.mealId;
        this.name = meal.name;
        this.price = meal.price;
        this.suitableVegan = meal.suitableVegan;
        this.suitableCeliac = meal.suitableCeliac;
        if (meal.ingredients) {
            for (let i = 0; i < meal.ingredients.length; i++) {
                this.ingredients[i] = meal.ingredients[i].name;
            }
        }
        if (meal.images) {
            for (let i = 0; i < meal.images.length; i++) {
                this.images[i] = meal.images[i].url;
            }
        }
    }
}
exports.MealDTO = MealDTO;
//# sourceMappingURL=meal.dto.js.map