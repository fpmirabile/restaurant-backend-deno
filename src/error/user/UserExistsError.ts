import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class UserExistsError extends BaseError{

    constructor(){
        super(ErrorMap.USUARIO_EXISTENTE);
    }

}