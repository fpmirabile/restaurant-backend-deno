import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Meal } from "../models";

@Entity({
  name: "PHOTOS_MEALS",
})
export class PhotoMeal {
  @PrimaryGeneratedColumn({ name: "photo_meal_id" })
  photoMealId!: number;

  @Column({
    name: "url",
  })
  url: string;

  constructor(url: string, meal: Meal) {
    this.url = url;
    this.meal = meal;
  }

  @ManyToOne(() => Meal)
  @JoinColumn({ name: "meal_id" })
  meal: Meal;
}
