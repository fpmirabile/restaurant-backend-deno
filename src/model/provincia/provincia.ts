import {
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    Column,
  } from "typeorm";
  
  @Entity({
    name: "PROVINCIAS",
  })
  export class Provincia {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({
        name: "provincia"
      })
    provincia: string;

  }
  