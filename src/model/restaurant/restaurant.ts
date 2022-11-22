import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User, PhotoRestaurant, Speciality } from "../models";
import { OpenDay } from "./openDay";

@Entity({
  name: "RESTAURANTS",
})
export class Restaurant {
  @PrimaryGeneratedColumn({ name: "restaurant_id" })
  restaurantId: number;

  @Column({
    name: "streetNumber",
  })
  streetNumber: string;

  @Column({
    name: "street",
  })
  street: string;

  @Column({
    name: "neighborhood",
  })
  neighborhood: string;
  
  @Column({
    name: "place",
  })
  place: string;

  @Column({
    name: "state",
  })
  state: string;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "lat",
    nullable: true,
    type:"float"
  })
  lat: number;

  @Column({
    name: "lon",
    nullable: true,
    type:"float"
  })
  lon: number;

  @Column({
    name: "status",
  })
  status: string;

  @Column({
    name: "food_type",
    nullable:true
  })
  foodType: string;

  @Column({
    name: "price_range",
    nullable:true
  })
  priceRange:string

  @Column({
    name: "open",
    nullable:false,
    default:true
  })
  open:boolean

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => PhotoRestaurant, (photo) => photo.restaurant)
  photos: PhotoRestaurant[];

  @OneToMany(() => OpenDay, (openDay) => openDay.restaurant)
  openDays: OpenDay[];
}
