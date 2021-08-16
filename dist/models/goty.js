"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GotySchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    votos: {
        type: Number,
        default: 0
    }
});
GotySchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});
const Goty = mongoose_1.model('Goty', GotySchema);
exports.default = Goty;
