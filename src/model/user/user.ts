import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  Unique,
} from "typeorm";

@Entity({
  name: "USERS",
})
@Unique(["email"])
export class User {
  @PrimaryGeneratedColumn({ name: "user_id" })
  userId: number;

  @Column({
    name: "password",
  })
  password: string;

  @Column({
    name: "email",
  })
  email: string;

  @Column({
    name: "name",
  })
  name: string;

  @Column({
    name: "status",
  })
  status: string;

  @Column({
    name: "identifier",
    nullable: true,
  })
  identifier: string;

  @Column({
    name: "photo",
    nullable: true,
  })
  photo: string;

  @Column({
    name: "role",
  })
  role: string;
}
