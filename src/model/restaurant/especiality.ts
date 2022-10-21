import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    Unique
  } from 'typeorm'

  @Entity({
    name : 'ESPECIALITIES'
  })
  export class Especiality {
  
    @PrimaryGeneratedColumn({name: 'especiality_id'})
    especialityId!: number
  
    @Column({
        name: 'name'
    })
    name!: string

  }
  