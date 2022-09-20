import { BaseError } from "../base.error.ts";
import { ErrorMap } from "../ErrorMap.ts";

export class DifferentPasswordsError extends BaseError{

    constructor(){
        super(ErrorMap.CONTRASEÑAS_DIFERENTES);
    }

}