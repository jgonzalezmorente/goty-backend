"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
const goty_1 = __importDefault(require("../models/goty"));
exports.router = express_1.Router();
exports.router.post('/crear-goty', async (req, res) => {
    const goty = new goty_1.default(req.body);
    await goty.save();
    res.json({
        ok: true,
        goty
    });
});
exports.router.put('/votar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const gotyDb = await goty_1.default.findById(id);
        if (!gotyDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Juego no encontrado por id.'
            });
        }
        const gotyDbActualizado = await goty_1.default.findByIdAndUpdate(id, { votos: gotyDb.votos + 1 }, { new: true });
        server_1.default.instance.io.emit('cambio-goty', gotyDbActualizado);
        res.json({
            ok: true,
            goty: gotyDbActualizado
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.router.get('/goty', async (req, res) => {
    const goty = await goty_1.default.find();
    server_1.default.instance.io.emit('goty', goty);
    res.json({
        ok: true,
        goty
    });
});
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo está bien'
    });
});
exports.router.post('/mensajes', (req, res) => {
    const { cuerpo, de } = req.body;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const id = req.params.id;
    const { cuerpo, de } = req.body;
    const payload = {
        de,
        cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
exports.router.get('/usuarios', async (req, res) => {
    const server = server_1.default.instance;
    try {
        const clientes = await server.io.allSockets();
        res.json({
            ok: true,
            clientes: Array.from(clientes)
        });
    }
    catch (err) {
        res.json({
            ok: false,
            err
        });
    }
});
exports.router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: socket_1.usuariosConectados.getLista()
    });
});
exports.default = exports.router;
