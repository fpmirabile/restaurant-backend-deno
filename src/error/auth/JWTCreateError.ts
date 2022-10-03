import { ErrorMap } from "../ErrorMap";
import { BaseError } from "../base.error";

export class JWTCreateError extends BaseError{

    constructor(){
        super(ErrorMap.JWT_CREATE);
    }

}