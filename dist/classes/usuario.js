"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    constructor(id, nombre = 'sin-nombre', sala = 'sin-sala') {
        this.id = id;
        this.nombre = nombre;
        this.sala = sala;
    }
}
exports.Usuario = Usuario;
