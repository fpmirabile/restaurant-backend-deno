import { BaseError } from "../base.error";
import { ErrorMap } from "../ErrorMap";

export class RestaurantNotExistsError extends BaseError{

    constructor(){
        super(ErrorMap.RESTAURANT_INEXISTENTE);
    }

}