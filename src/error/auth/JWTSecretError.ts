import { ErrorMap } from "../ErrorMap";
import { BaseError } from "../base.error";

export class JWTSecretError extends BaseError{

    constructor(){
        super(ErrorMap.JWT_SECRET);
    }

}