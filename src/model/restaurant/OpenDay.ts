import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Restaurant } from "../models";

@Entity({
  name: "OPEN_DAYS",
})
export class OpenDay {
  @PrimaryGeneratedColumn({ name: "open_day_id" })
  openDayId: number;

  @Column({
    name: "day",
  })
  day: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  constructor(day: string, restaurant: Restaurant) {
    this.day = day;
    this.restaurant = restaurant;
  }
}
