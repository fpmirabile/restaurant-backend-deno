import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class MealNotExistsError extends BaseError{

    constructor(){
        super(ErrorMap.PLATO_NO_EXISTENTE);
    }

}