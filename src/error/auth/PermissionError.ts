import { ErrorMap } from "../ErrorMap";
import { BaseError } from "../base.error";

export class PermissionError extends BaseError{

    constructor(){
        super(ErrorMap.PERMISOS_INSUFICIENTES);
    }

}