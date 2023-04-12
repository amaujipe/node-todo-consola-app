import * as fs from 'node:fs';

const archivo = './db/data.json';



/**
 * Recibe como data un arreglo con el listado de las tareas, y crea un archivo .JSON 
 * en el que almacena el listado.
 * @param { Tarea[] } data 
 */
const guardarDataEnDB = ( data ) => {

    fs.writeFileSync( archivo, JSON.stringify(data) );

}


/**
 * Lee el archivo .JSON que almacena el listado de tareas y lo retorna
 * @returns { Tarea[] }
 */
const leerDB = () => {

    // Valor de retorno sino existe el archivo con el listado de tareas
    if( !fs.existsSync(archivo) ) return null;

    // Valor de retorno si existe el archivo con el listado de tareas
    const data = fs.readFileSync( archivo, {encoding: 'utf-8'} )
    return JSON.parse( data );

}

export {
    guardarDataEnDB,
    leerDB
} 