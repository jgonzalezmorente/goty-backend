"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
const environment_1 = require("../global/environment");
const dbConnection = async () => {
    try {
        await mongoose_1.connect(environment_1.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('DB Online!');
    }
    catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
};
exports.dbConnection = dbConnection;
exports.default = exports.dbConnection;
