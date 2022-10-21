import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm'
import { Ingredient, Menu, PhotoMeal } from '../Models'

  @Entity({
    name : 'MEALS'
  })
  export class Meal {
  
    @PrimaryGeneratedColumn({name: 'meal_id'})
    mealId!: number
  
    @Column({
        name: 'name'
    })
    name!: string

    @Column({
        name: 'price'
    })
    price!: number

    @Column({
        name: 'suitable_vegan'
    })
    suitableVegan!: string

    @Column({
        name: 'suitable_celiac'
    })
    suitableCeliac!: string
 
    @ManyToOne(() => Menu)
    @JoinColumn({name: 'menu_id'})
    menu!: Menu

    @OneToMany(() => PhotoMeal, image => image.meal)
    images!:PhotoMeal[]

    @OneToMany(() => Ingredient, ingredient => ingredient.meal)
    ingredients!:Ingredient[]

    

  }
  