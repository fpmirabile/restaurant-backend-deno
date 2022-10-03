import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'
import { User } from '../Models'

  @Entity({
    name : 'RESTAURANTS'
  })
  export class Restaurant {
  
    @PrimaryGeneratedColumn({name: 'restaurant_id'})
    restaurantId!: number
  
    @Column({
        name: 'streetNumber'
    })
    streetNumber!: string
  
  
    @Column({
        name: 'street'
    })
    street!: string
  
    @Column({
        name: 'neighborhood'
    })
    neighborhood!: string
  
    @Column({
        name: 'place'
    })
    place!: string
  
    @Column({
        name: 'state'
    })
    state!: string
  
    @Column({
        name: 'name'
    })
    name!: string
  
    @Column({
        name: 'lat',
        nullable:true
    })
    lat!: string
  
    @Column({
        name: 'lon'
    })
    lon!: string
 
    @Column({
        name: 'openTime'
    })
    openTime!: string
   
    @Column({
        name: 'closeTime'
    })
    closeTime!: string
 
    @Column({
        name: 'status'
    })
    status!: string
 
    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user!: User

  }
  