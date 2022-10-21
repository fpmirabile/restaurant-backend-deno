import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'
import { Restaurant } from '../Models'

  @Entity({
    name : 'PHOTOS_RESTAURANTS'
  })
  export class PhotoRestaurant {
  
    @PrimaryGeneratedColumn({name: 'photo_restaurant_id'})
    photoRestaurantId!: number
  
    @Column({
        name: 'url'
    })
    url!: string
 
    @ManyToOne(() => Restaurant)
    @JoinColumn({name: 'restaurant_id'})
    restaurant!: Restaurant

    constructor(url:string, restaurant:Restaurant){
      this.url =url
      this.restaurant = restaurant
    }

  }
  