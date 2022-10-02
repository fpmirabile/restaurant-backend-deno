import { DataTypes, Model, Relationships } from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";
import { PhotoRestaurant } from "./photo.ts";

export class Restaurant extends Model {
    static table = 'RESTAURANTS';
    static timestamps = true;
  
    static fields = {
      restaurant_id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      street: DataTypes.STRING,
      streetNumber: DataTypes.STRING,
      neighborhood: DataTypes.STRING,
      place: DataTypes.STRING,
      state: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      openTime: DataTypes.STRING,
      closeTime: DataTypes.STRING,
      status: DataTypes.STRING
    };

    static photos = Relationships.belongsTo(Restaurant, PhotoRestaurant, {"foreignKey": "restaurant_id"});
  
    static defaults = {
      flightDuration: 2.5,
    };

  }


