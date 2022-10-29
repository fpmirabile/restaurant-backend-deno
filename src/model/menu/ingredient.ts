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
    name : 'INGREDIENTS'
  })
  export class Ingredient {
  
    @PrimaryGeneratedColumn({name: 'ingredient_id'})
    ingredientId!: number
  
    @Column({
        name: 'name'
    })
    name!: string
 
    @ManyToOne(() => Meal)
    @JoinColumn({name: 'meal_id'})
    meal!: Meal

    constructor(name:string, meal:Meal){
      this.name =name
      this.meal = meal
    }

  }
  