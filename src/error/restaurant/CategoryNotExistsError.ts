import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class CategoryNotExistsError extends BaseError{

    constructor(){
        super(ErrorMap.CATEGORIA_INEXISTENTE);
    }

}