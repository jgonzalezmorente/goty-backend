import { Socket, Server } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = ( cliente: Socket, io: Server ) => {

    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar( usuario );    

}


export const desconectar = ( cliente: Socket, io: Server ) => {

    cliente.on( 'disconnect', () => {

        console.log( 'Usuario desconectado' );
        usuariosConectados.borrarUsuario( cliente.id );
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );

    });
}


export const mensaje = ( cliente: Socket, io: Server ) => {

    cliente.on( 'mensaje', ( payload: { de: string, cuerpo: string } ) => {

        console.log( 'Mensaje recibido', payload );
        io.emit( 'mensaje-nuevo', payload );

    });
};


export const configurarUsuario = ( cliente: Socket, io: Server ) => {

    cliente.on( 'configurar-usuario', ( payload: { nombre: string }, callback: ( resp: any ) => void ) => {

        usuariosConectados.actualizarNombre( cliente.id, payload.nombre );
        io.emit( 'usuarios-activos', usuariosConectados.getLista() );

        callback({
            ok: true,
            mensaje: `Usuario ${ payload.nombre } configurado`
        });

    });
};


export const obtenerUsuarios = ( cliente: Socket, io: Server ) => {

    cliente.on( 'obtener-usuarios', () => {

        io.to( cliente.id ).emit( 'usuarios-activos', usuariosConectados.getLista() );

    });
}
