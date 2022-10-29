import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Unique
  } from 'typeorm'
import { Category, Ingredient, PhotoMeal } from '../Models'

  @Entity({
    name : 'MEALS'
  })
  @Unique(["name", "category"])
  export class Meal {
  
    @PrimaryGeneratedColumn({name: 'meal_id'})
    mealId!: number
  
    @Column({
        name: 'name'
    })
    name!: string

    @Column({
        name: 'price',
        type:'float'
    })
    price!: number

    @Column({
        name: 'suitable_vegan'
    })
    suitableVegan!: boolean

    @Column({
        name: 'suitable_celiac'
    })
    suitableCeliac!: boolean

    @Column({
        name: 'status'
    })
    status!: string
 
    @ManyToOne(() => Category)
    @JoinColumn({name: 'category_id'})
    category!: Category

    @OneToMany(() => PhotoMeal, image => image.meal)
    images!:PhotoMeal[]

    @OneToMany(() => Ingredient, ingredient => ingredient.meal)
    ingredients!:Ingredient[]

    

  }
  