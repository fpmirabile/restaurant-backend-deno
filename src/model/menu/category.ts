import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany
  } from 'typeorm'
import { Meal, Restaurant } from '../Models'

  @Entity({
    name : 'CATEGORIES'
  })
  export class Category {
  
    @PrimaryGeneratedColumn({name: 'category_id'})
    categoryId!: number
  
    @Column({
        name: 'name'
    })
    name!: string

    @Column({
      name: 'status',
      nullable:false
    })
    status!: string
 
    @ManyToOne(() => Restaurant)
    @JoinColumn({name: 'restaurant_id'})
    restaurant!: Restaurant

    @OneToMany(() => Meal, meal => meal.category)
    meals!:Meal[]

    

  }
  