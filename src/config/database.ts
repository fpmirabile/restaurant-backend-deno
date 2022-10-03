import { ConnectionOptions } from 'typeorm'
import * as Models from '../model/Models'

const configDev: ConnectionOptions = {
  type: 'mysql',
  host: process.env.BD_SEMINARIO_HOST || '192.168.230.129',
  port: Number(process.env.BD_SEMINARIO_PORT) || 3306,
  username: process.env.BD_SEMINARIO_USER || 'root',
  password: process.env.BD_SEMINARIO_PASSWORD || 'admin',
  database: process.env.BD_SEMINARIO_DB || 'morfando',
  // host: process.env.BD_SEMINARIO_HOST || 'ec2-52-87-107-83.compute-1.amazonaws.com',
  // port: Number(process.env.BD_SEMINARIO_PORT) || 5432,
  // username: process.env.BD_SEMINARIO_USER || 'kgxihiewxpehdh',
  // password: process.env.BD_SEMINARIO_PASSWORD || 'dbd9fa60a80aef22e531a196a6d9f3c27b25d83a96c19a95d1e89939908c54d5',
  // database: process.env.BD_SEMINARIO_DB || 'df81idmi9pesh2',
  entities: Object.values(Models),
  synchronize: true,
  logger:'debug'

}

const configProd: ConnectionOptions = {
  type: 'mysql',
  url: process.env.DATABASE_URL,
  entities: Object.values(Models),
  synchronize: true,
  logger:'debug'

}

const dbConfig = {
  configDev : configDev,
  configProd : configProd
}



export default dbConfig
