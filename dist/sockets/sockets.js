"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectar = void 0;
const desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
};
exports.desconectar = desconectar;
