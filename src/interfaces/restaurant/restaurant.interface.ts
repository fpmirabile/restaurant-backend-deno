import { newTime } from "./times.interface"

export interface newRestaurant{
    name:string,
    street:string,
    streetNumber:string,
    neighborhood:string
    place:string
    state:string
    lat:number
    lon:number
    openDays:newTime[]
    images:string[]
    foodType:string
    priceRange:string
}