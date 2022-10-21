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
exports.PhotoMeal = void 0;
const typeorm_1 = require("typeorm");
const Models_1 = require("../Models");
let PhotoMeal = class PhotoMeal {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'photo_meal_id' }),
    __metadata("design:type", Number)
], PhotoMeal.prototype, "photoMealId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'url'
    }),
    __metadata("design:type", String)
], PhotoMeal.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Models_1.Meal),
    (0, typeorm_1.JoinColumn)({ name: 'meal_id' }),
    __metadata("design:type", Models_1.Meal)
], PhotoMeal.prototype, "meal", void 0);
PhotoMeal = __decorate([
    (0, typeorm_1.Entity)({
        name: 'PHOTOS_MEALS'
    })
], PhotoMeal);
exports.PhotoMeal = PhotoMeal;
//# sourceMappingURL=PhotoMeal.js.map