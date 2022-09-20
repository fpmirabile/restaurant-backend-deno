import { BaseError } from "../base.error.ts";
import { ErrorMap } from "../ErrorMap.ts";

export class UserExistsError extends BaseError{

    constructor(){
        super(ErrorMap.USUARIO_EXISTENTE);
    }

}