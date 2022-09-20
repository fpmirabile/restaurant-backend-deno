import { BaseError } from "../base.error.ts";
import { ErrorMap } from "../ErrorMap.ts";

export class InvalidCredentialsError extends BaseError{

    constructor(){
        super(ErrorMap.CREDENCIALES_INVALIDAS);
    }

}