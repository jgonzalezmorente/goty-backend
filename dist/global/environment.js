"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_CNN = void 0;
const SERVER_PORT = Number(process.env.PORT) || 5000;
exports.DB_CNN = process.env.DB_CNN || 'mongodb+srv://dbUser:qPnB5757@cluster0.4ihvq.mongodb.net/gotydb';
exports.default = SERVER_PORT;
