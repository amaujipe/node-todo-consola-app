const { mostrarMenu, pausa } = require('./helpers/mensajes');

// importando el paquete colors de npm
require('colors');

// Limpiando la consola siempre que se ejecuta la aplicacion
console.clear();

// Funcion que maneja toda la aplicacion, se crea para manejar asincronismo
const main = async() => {
    
    console.log('Hola mundo');

    let opcion = '';

    do {

        opcion = await mostrarMenu();
        console.log({ opcion });

        if( opcion !== '0' ) await pausa();

    } while( opcion !== '0' );

}

main();