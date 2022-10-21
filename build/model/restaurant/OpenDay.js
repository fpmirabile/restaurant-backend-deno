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
exports.OpenDay = void 0;
const typeorm_1 = require("typeorm");
const Models_1 = require("../Models");
let OpenDay = class OpenDay {
    constructor(day, restaurant) {
        this.day = day;
        this.restaurant = restaurant;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'open_day_id' }),
    __metadata("design:type", Number)
], OpenDay.prototype, "openDayId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'day'
    }),
    __metadata("design:type", String)
], OpenDay.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Models_1.Restaurant),
    (0, typeorm_1.JoinColumn)({ name: 'restaurant_id' }),
    __metadata("design:type", Models_1.Restaurant)
], OpenDay.prototype, "restaurant", void 0);
OpenDay = __decorate([
    (0, typeorm_1.Entity)({
        name: 'OPEN_DAYS'
    }),
    __metadata("design:paramtypes", [String, Models_1.Restaurant])
], OpenDay);
exports.OpenDay = OpenDay;
//# sourceMappingURL=OpenDay.js.map