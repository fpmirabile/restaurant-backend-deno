"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models = __importStar(require("../model/Models"));
const configDev = {
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
    logger: 'debug'
};
const configProd = {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    entities: Object.values(Models),
    synchronize: true,
    logger: 'debug'
};
const dbConfig = {
    configDev: configDev,
    configProd: configProd
};
exports.default = dbConfig;
//# sourceMappingURL=database.js.map