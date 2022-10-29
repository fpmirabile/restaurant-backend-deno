import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
  } from 'typeorm'

  @Entity({
    name : 'SPECIALITIES'
  })
  export class Speciality {
  
    @PrimaryGeneratedColumn({name: 'speciality_id'})
    specialityId!: number
  
    @Column({
        name: 'name'
    })
    name: string

  }
  