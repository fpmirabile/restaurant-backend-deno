import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'
import { Meal } from '../Models'

  @Entity({
    name : 'PHOTOS_MEALS'
  })
  export class PhotoMeal {
  
    @PrimaryGeneratedColumn({name: 'photo_meal_id'})
    photoMealId!: number
  
    @Column({
        name: 'url'
    })
    url!: string
 
    @ManyToOne(() => Meal)
    @JoinColumn({name: 'meal_id'})
    meal!: Meal

  }
  