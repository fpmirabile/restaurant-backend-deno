import { ErrorType } from "./ErrorMap.ts";

export abstract class BaseError extends Error{

    status:number

    constructor(error:ErrorType){
        super()
        this.message = error.message
        this.status = error.status
    }

}