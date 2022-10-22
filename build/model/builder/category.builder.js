"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryBuilder = void 0;
const Models_1 = require("../Models");
class CategoryBuilder {
    constructor() {
        this.build = () => {
            const category = new Models_1.Category();
            category.categoryId = this.categoryId;
            category.restaurant = this.restaurant;
            category.name = this.name;
            category.status = this.status;
            return category;
        };
    }
    withName(name) {
        this.name = name;
        return this;
    }
    withRestaurant(restaurant) {
        this.restaurant = restaurant;
        return this;
    }
    withCategoryId(categoryId) {
        this.categoryId = categoryId;
        return this;
    }
    withStatus(status) {
        this.status = status;
        return this;
    }
}
exports.CategoryBuilder = CategoryBuilder;
//# sourceMappingURL=category.builder.js.map