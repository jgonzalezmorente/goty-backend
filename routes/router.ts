import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';
import Goty from '../models/goty';

export const router = Router();



router.post( '/crear-goty', async ( req: Request, res: Response ) => {

    const goty = new Goty( req.body );
    
    await goty.save();    
    
    res.json({
        ok: true,
        goty
    });
    
});


router.put( '/votar/:id', async ( req: Request, res: Response ) => {

    const id: String = req.params.id;

    try {

        const gotyDb = await Goty.findById( id );

        if (!gotyDb) {
            return res.status(404).json({
                ok: false,
                msg: 'Juego no encontrado por id.'
            });
        }        

        const gotyDbActualizado = await Goty.findByIdAndUpdate( id, { votos: gotyDb.votos + 1 }, { new: true } );

        Server.instance.io.emit( 'cambio-goty', gotyDbActualizado );

        res.json({
            ok: true,
            goty: gotyDbActualizado
        });

    } catch ( error ) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

});



router.get( '/goty', async( req: Request, res: Response ) => {

    const goty = await Goty.find();

    Server.instance.io.emit( 'goty', goty );

    res.json({
        ok: true,
        goty
    });

});



router.get( '/mensajes', ( req: Request, res: Response  ) => {

    res.json({
        ok: true,
        mensaje: 'Todo está bien'
    });
});


router.post( '/mensajes', ( req: Request, res: Response ) => {

    const { cuerpo, de } = req.body;
    
    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
    });
});


router.post( '/mensajes/:id', ( req: Request, res: Response ) => {

    const id = req.params.id;
    const { cuerpo, de } = req.body;
    
    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });

});


router.get( '/usuarios', async ( req: Request, res: Response ) => {

    const server = Server.instance;

    try {

        const clientes = await server.io.allSockets();

        res.json({
            ok: true,
            clientes: Array.from( clientes )
        });
            
    } catch ( err ) {

        res.json({
            ok: false,
            err
        });
        
    }
    
});



router.get( '/usuarios/detalle', ( req: Request, res: Response ) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });



});





export default router;

