import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class InvalidCredentialsError extends BaseError{

    constructor(){
        super(ErrorMap.CREDENCIALES_INVALIDAS);
    }

}