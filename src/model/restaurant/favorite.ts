import {
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    Column,
  } from "typeorm";
  import { Restaurant, User } from "../models";
  
  @Entity({
    name: "FAVORITES",
  })
  export class Favorite {
    @PrimaryGeneratedColumn({ name: "favorite_id" })
    favoriteId: number;

    @Column({
      name: "favorite",
      default:true
    })
    favorite: boolean;
  
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
  