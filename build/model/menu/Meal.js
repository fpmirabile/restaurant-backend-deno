"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meal = void 0;
const typeorm_1 = require("typeorm");
const Models_1 = require("../Models");
let Meal = class Meal {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'meal_id' }),
    __metadata("design:type", Number)
], Meal.prototype, "mealId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name'
    }),
    __metadata("design:type", String)
], Meal.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'price'
    }),
    __metadata("design:type", Number)
], Meal.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'suitable_vegan'
    }),
    __metadata("design:type", Boolean)
], Meal.prototype, "suitableVegan", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'suitable_celiac'
    }),
    __metadata("design:type", Boolean)
], Meal.prototype, "suitableCeliac", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Models_1.Category),
    (0, typeorm_1.JoinColumn)({ name: 'category_id' }),
    __metadata("design:type", Models_1.Category)
], Meal.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Models_1.PhotoMeal, image => image.meal),
    __metadata("design:type", Array)
], Meal.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Models_1.Ingredient, ingredient => ingredient.meal),
    __metadata("design:type", Array)
], Meal.prototype, "ingredients", void 0);
Meal = __decorate([
    (0, typeorm_1.Entity)({
        name: 'MEALS'
    })
], Meal);
exports.Meal = Meal;
//# sourceMappingURL=Meal.js.map