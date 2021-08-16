
import { Schema, model } from 'mongoose';


const GotySchema = new Schema({

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


GotySchema.method( 'toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

const Goty = model ( 'Goty', GotySchema );
export default Goty;




