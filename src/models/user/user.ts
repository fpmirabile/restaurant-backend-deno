import { DataTypes, Model } from "https://raw.githubusercontent.com/joeldesante/denodb/master/mod.ts";

export class User extends Model {
    static table = 'USUARIOS';
    static timestamps = true;
  
    static fields = {
      usuario_id: { primaryKey: true, autoIncrement: true },
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      foto: DataTypes.STRING,
      estado: DataTypes.STRING,
      identificador: DataTypes.STRING,
      plataforma: DataTypes.STRING,
    };
  
    static defaults = {
      flightDuration: 2.5,
    };
  }
