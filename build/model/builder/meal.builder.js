"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MealBuilder = void 0;
const Models_1 = require("../Models");
class MealBuilder {
    constructor() {
        this.build = () => {
            const meal = new Models_1.Meal();
            meal.mealId = this.mealId;
            meal.name = this.name;
            meal.price = this.price;
            meal.suitableVegan = this.suitableVegan;
            meal.suitableCeliac = this.suitableCeliac;
            meal.status = this.status;
            meal.category = this.category;
            return meal;
        };
        this.withNewMeal = (newMeal) => {
            this.name = newMeal.name;
            this.price = newMeal.price;
            this.suitableVegan = newMeal.suitableVegan;
            this.suitableCeliac = newMeal.suitableCeliac;
            return this;
        };
        this.withMeal = (meal) => {
            this.name = meal.name;
            this.price = meal.price;
            this.suitableVegan = meal.suitableVegan;
            this.suitableCeliac = meal.suitableCeliac;
            this.mealId = meal.mealId;
            this.category = meal.category;
            return this;
        };
        this.withStatus = (status) => {
            this.status = status;
            return this;
        };
        this.withCategory = (category) => {
            this.category = category;
            return this;
        };
    }
}
exports.MealBuilder = MealBuilder;
//# sourceMappingURL=meal.builder.js.map