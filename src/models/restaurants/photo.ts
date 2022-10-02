import { DataTypes, Model, Relationships } from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";
import { Restaurant } from "./restaurant.ts";

export class PhotoRestaurant extends Model {
    static table = 'PHOTOS_RESTAURANTS';
    static timestamps = true;
  
    static fields = {
      photo_id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      url: DataTypes.STRING
    };
  
    static defaults = {
      flightDuration: 2.5,
    };

  }
