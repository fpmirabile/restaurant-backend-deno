"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const Router_1 = __importDefault(require("./api/routes/Router"));
const typeorm_1 = require("typeorm");
const database_1 = __importDefault(require("./config/database"));
const errorHandler_1 = require("./api/middleware/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use(Router_1.default);
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT || 3001;
const env = process.env.ENV || "DEV";
let configuracionBD;
if (env === "DEV") {
    configuracionBD = database_1.default.configDev;
}
else {
    configuracionBD = database_1.default.configProd;
}
(0, typeorm_1.createConnection)(configuracionBD)
    .then((_connection) => {
    app.listen(port, () => {
        console.log('Escuchando Puerto: ' + port);
    });
})
    .catch((err) => {
    console.log('Unable to connect to db', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map