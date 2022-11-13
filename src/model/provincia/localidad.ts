import {
    PrimaryGeneratedColumn,
    Entity,
    ManyToOne,
    JoinColumn,
    Column,
  } from "typeorm";
  import { Provincia } from "../models";
  
  @Entity({
    name: "LOCALIDADES",
  })
  export class Localidad {

    @PrimaryGeneratedColumn({ name: "id" })
    id: number;

    @Column({
        name: "localidad"
      })
    localidad: string;

    @ManyToOne(() => Provincia)
    @JoinColumn({ name: "id_provincia" })
    provincia: Provincia;

  }
  