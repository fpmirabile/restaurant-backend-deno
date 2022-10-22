"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryDTO = void 0;
const meal_dto_1 = require("./meal.dto");
class CategoryDTO {
    constructor(category) {
        this.items = [];
        this.id = category.categoryId;
        this.name = category.name;
        for (let i = 0; i < category.meals.length; i++) {
            this.items[i] = new meal_dto_1.MealDTO(category.meals[i]);
        }
    }
}
exports.CategoryDTO = CategoryDTO;
//# sourceMappingURL=category.dto.js.map