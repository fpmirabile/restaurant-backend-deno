import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class DifferentPasswordsError extends BaseError{

    constructor(){
        super(ErrorMap.CONTRASEÑAS_DIFERENTES);
    }

}