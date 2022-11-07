import { newTime } from "./times.interface"

export interface newRestaurant{
    name:string,
    street:string,
    streetNumber:string,
    neighborhood:string
    place:string
    state:string
    lat:string
    lon:string
    openDays:newTime[]
    images:string[]
}