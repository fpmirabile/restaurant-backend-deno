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
    name : 'MENUS'
  })
  export class Menu {
  
    @PrimaryGeneratedColumn({name: 'menu_id'})
    menuId!: number
  
    @Column({
        name: 'name'
    })
    name!: string
 
    @ManyToOne(() => Restaurant)
    @JoinColumn({name: 'restaurant_id'})
    restaurant!: Restaurant

    

  }
  