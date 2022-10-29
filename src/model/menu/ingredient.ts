import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Meal } from "../models";

@Entity({
  name: "INGREDIENTS",
})
export class Ingredient {
  constructor(name: string, meal: Meal) {
    this.name = name;
    this.meal = meal;
  }
  @PrimaryGeneratedColumn({ name: "ingredient_id" })
  ingredientId: number;

  @Column({
    name: "name",
  })
  name: string;

  @ManyToOne(() => Meal)
  @JoinColumn({ name: "meal_id" })
  meal: Meal;
}
