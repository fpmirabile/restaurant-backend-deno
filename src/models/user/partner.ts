import { DataTypes, Model } from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";

export class Partner extends Model {
    static table = 'PARTNERS';
    static timestamps = true;
  
    static fields = {
      partner_id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      email: {
        type: DataTypes.STRING
      },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,
      status: DataTypes.STRING
    };
  
    static defaults = {
      flightDuration: 2.5,
    };
  }
