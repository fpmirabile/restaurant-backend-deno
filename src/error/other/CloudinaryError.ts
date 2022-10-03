import { ErrorMap } from "../ErrorMap";
import { BaseError } from "../base.error";

export class CloudinaryError extends BaseError{

    constructor(){
        super(ErrorMap.CLOUDINARY_ERROR);
    }

}