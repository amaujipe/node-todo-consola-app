// Importacion de paquetes, metodos, y clases
import { mostrarListadoCompletarTareas, confirmarBorrarTarea, inquirerMenu, leerInput, listarTareasABorrar, pausa } from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";
import { guardarDataEnDB, leerDB } from "./helpers/interaccionDB.js";

// Limpiando la consola siempre que se ejecuta la aplicacion
console.clear();


/**
 * Funcion que maneja toda la aplicacion, se crea para manejar asincronismo
 */
const main = async() => {

    // Definiendo la variable que controla las opciones del menu
    let opcion = '';
    // Crea una instancia de tareas para controlar el listado
    const tareas = new Tareas();
    // Trae las tareas que se encuentran en base de datos
    const tareasEnDB = leerDB();
    // Si existen tareas en DB, se crea una nueva instancia de tarea para cada una
    if( tareasEnDB ) tareas.crearTareasDesdeDB( tareasEnDB );

    do {

        // Almacena la opcion elegida por el usuario
        opcion = await inquirerMenu();

        // Acciones ejecutadas segun la opcion elegida por el usaurio
        switch ( opcion ) {

            case '1':
                // Captura la descripcion de la tarea escrita por el usaurio en la consola
                const descTarea = await leerInput('Descripción: ');
                // Crea la tarea
                tareas.crearTarea( descTarea );
                break;

            case '2':
                // Lista ordenada de todas las tareas
                tareas.listadoCompleto();
                break;

            case '3':
                // Lista ordenada de las tareas completadas
                tareas.listarTareasPorEstado( true );
                break;

            case '4':
                // Lista ordenada de las tareas pendientes
                tareas.listarTareasPorEstado( false );
                break;

            case '5':
                // Completar tareas
                const ids = await mostrarListadoCompletarTareas( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;

            case '6':
                // Borrar tareas
                const id = await listarTareasABorrar( tareas.listadoArr );
                if( id !== '0' ) {   // 0. Cancelar

                    const confimacion = await confirmarBorrarTarea( '¿Está seguro?' );
                    if( confimacion ) {
                        tareas.borrarTarea( id );
                        console.log( 'Tarea borrada' );
                    }

                }
                break;

        }

        // Agrega las tareas de la sesion en la base de datos
        guardarDataEnDB( tareas.listadoArr );
        // Detiene flujo de la aplicacion y espera confirmacion para continuar
        if( opcion !== '0') await pausa();
        // Limpiando la consola siempre que se ejecuta la aplicacion
        console.clear();

    } while( opcion !== '0' );

}

main();