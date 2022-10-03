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
exports.Restaurant = void 0;
const typeorm_1 = require("typeorm");
const Models_1 = require("../Models");
let Restaurant = class Restaurant {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'restaurant_id' }),
    __metadata("design:type", Number)
], Restaurant.prototype, "restaurantId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'streetNumber'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "streetNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'street'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "street", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'neighborhood'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'place'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "place", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'state'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'name'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'lat',
        nullable: true
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "lat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'lon'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "lon", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'openTime'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "openTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'closeTime'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "closeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status'
    }),
    __metadata("design:type", String)
], Restaurant.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Models_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", Models_1.User)
], Restaurant.prototype, "user", void 0);
Restaurant = __decorate([
    (0, typeorm_1.Entity)({
        name: 'RESTAURANTS'
    })
], Restaurant);
exports.Restaurant = Restaurant;
//# sourceMappingURL=restaurant.js.map