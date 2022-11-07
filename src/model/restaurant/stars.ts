import {
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    Column,
  } from "typeorm";
  import { Restaurant, User } from "../models";
  
  @Entity({
    name: "STARS",
  })
  export class Stars {
    @PrimaryGeneratedColumn({ name: "stars_id" })
    starsId: number;

    @Column({
        name: "stars",
      })
    stars: number;
  
    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;
  
    @ManyToOne(() => Restaurant)
    @JoinColumn({ name: "restaurant_id" })
    restaurant: Restaurant;
  
    constructor(user: User, restaurant: Restaurant) {
      this.user = user;
      this.restaurant = restaurant;
    }
  }
  