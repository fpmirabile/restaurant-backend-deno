import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class MealExistsError extends BaseError{

    constructor(){
        super(ErrorMap.PLATO_EXISTENTE);
    }

}