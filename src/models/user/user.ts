import { DataTypes, Model } from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";

export class User extends Model {
    static table = 'USERS';
    static timestamps = true;
  
    static fields = {
      user_id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      status: DataTypes.STRING,
      identifier: DataTypes.STRING,
      photo: DataTypes.STRING,
      role: DataTypes.STRING
    };
  
    static defaults = {
      flightDuration: 2.5,
    };

  }
