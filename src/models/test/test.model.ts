import { DataTypes, Model } from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";

export class TestModel extends Model {
  static table = 'test';
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    flightDuration: DataTypes.FLOAT,
  };

  static defaults = {
    flightDuration: 2.5,
  };
}