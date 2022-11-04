import { NewUser } from "../../interfaces/user/user.interface";
import { User } from "../models";

export class UserBuilder{
    userId!: number;
    email!:string
    password!: string
    name!:string
    status!:string
    identifier!:string
    photo!:string
    role!:string


    build = ():User => {
        const user = new User()
        user.userId = this.userId
        user.email = this.email.toLowerCase()
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

    withEmail = (email:string) => {
        this.email = email
        return this
    }

    withIdentifier = (identifier:string) => {
        this.identifier = identifier
        return this
    }

    withPassword = (password:string) => {
        this.password = password
        return this
    }
}