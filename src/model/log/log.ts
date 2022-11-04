import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from "typeorm";
  import { Meal, Restaurant } from "../models";
  
  @Entity({
    name: "LOGS",
  })
  export class Log {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;
  
    @Column({
        name: "url"
    })
    url: string;

    @Column({
      name: "verb",
    })
    verb: string; 

    @Column({
      name: "request",
    })
    request: string; 

    @Column({
        name: "response",
        nullable:true
      })
      response: string;
    
    @Column({
        name: "status",
        nullable:true
    })
    status: number;

    @Column({
        name: "userId",
        nullable:true
    })
    userId: number;

    @Column({
        name: "date"
    })
    date: Date;


  }
  