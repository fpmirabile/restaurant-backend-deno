export class UserDTO{
    id:number;
    name:string;
    email:string;
    status:string;
    role:string;

    constructor(id:number,
        name:string,
        email:string,
        status:string,
        role:string){

            this.id = id
            this.email = email
            this.name = name
            this.status = status
            this.role = role
    }
}