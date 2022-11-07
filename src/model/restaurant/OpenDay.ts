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

  @Column({
    name: "open",
    default:true
  })
  open: boolean;

  @Column({
    name: "openTime",
    nullable:true
  })
  openTime: string;

  @Column({
    name: "closeTime",
    nullable:true
  })
  closeTime: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurant_id" })
  restaurant: Restaurant;

  constructor(day: string, restaurant: Restaurant, openTime:string, closeTime:string, open:boolean) {
    this.day = day;
    this.restaurant = restaurant;
    this.openTime = openTime;
    this.closeTime = closeTime;
    this.open = open;
  }
}
