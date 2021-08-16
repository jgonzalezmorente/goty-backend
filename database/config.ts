import { connect } from 'mongoose';
import { DB_CNN } from '../global/environment';


export const dbConnection = async () => {

    try {

        await connect( DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true

        });

        console.log( 'DB Online!' );

    } catch (error) {

        console.log( error );
        throw new Error( 'Error a la hora de iniciar la BD ver logs' );
        
    }

};



export default dbConnection;


