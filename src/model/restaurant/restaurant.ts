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

  @ManyToOne(() => Speciality)
  @JoinColumn({ name: "especiality_id" })
  speciality!: Speciality;
  
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
  })
  lat: string;

  @Column({
    name: "lon",
  })
  lon: string;

  @Column({
    name: "status",
  })
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToMany(() => PhotoRestaurant, (photo) => photo.restaurant)
  photos: PhotoRestaurant[];

  @OneToMany(() => OpenDay, (openDay) => openDay.restaurant)
  openDays: OpenDay[];
}
