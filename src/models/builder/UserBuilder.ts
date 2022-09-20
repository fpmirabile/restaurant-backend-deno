import { NewUser } from "../../interfaces/user.interface.ts";
import { User } from "../index.ts";

export class UserBuilder{
    user_id!: number;
    email!:string
    password!: string
    name!:string
    status!:string
    identifier!:string
    photo!:string
    role!:string


    build = ():User => {
        const user = new User()
        user.user_id = this.user_id
        user.email = this.email
        user.password = this.password
        user.name = this.name
        user.status = this.status
        user.identifier = this.identifier
        user.photo = this.photo
        user.role = this.role
        return user
    }

    withNewUser = (newUser:NewUser) => {
        this.email = newUser.email
        this.password = newUser.password
        this.name = newUser.name

        return this
    }

    withRole = (role:string) => {
        this.role = role
        return this
    }

    withStatus = (status:string) => {
        this.status = status
        return this
    }
}