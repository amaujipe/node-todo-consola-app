// Importacion de paquetes
import Tarea from "./tarea.js";
import colors from 'colors';

/**
 * Clase que controla el listado de tareas
 */
class Tareas {

    constructor() {
        this._listado = {};
    }


    /**
     * Crea una nueva instancia de la clase tarea y la agrega al listado de tareas
     * @param { String } desc 
     */
    crearTarea( desc = '' ) {

        const tarea = Tarea.crearNuevaTarea( desc );
        this._listado[tarea.id] = tarea;

    }

    borrarTarea( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    
    /**
     * Crea una nueva instancia de tarea de cada una de las tareas almacenadas en la DB
     * y la agrega al listado de tareas
     * @param { String[] } tareas 
     */
    crearTareasDesdeDB( tareas = [] ) {

        tareas.forEach( ({id, desc, completadoEn}) => {

            const nuevaTarea = Tarea.crearTareaDesdeDB( id, desc, completadoEn );
            this._listado[nuevaTarea.id] = nuevaTarea;

        });

    }


    /**
     * Convierte el listado original de tareas de un objeto a un arreglo y lo retorna
     * @returns { Tarea[] }
     */
    get listadoArr() {

        const listado = [];

        // Crea un arreglo con los ID's de cada tarea, para extraer cada tarea del listado
        // original y agregarla al nuevo listado de tipo arreglo.
        Object.keys( this._listado ).forEach( key => {
            listado.push( this._listado[key] );
        });

        return listado;

    }

    
    /**
     * Muestra en consola el listado ordenado de todas las tareas y su estado
     */
    listadoCompleto() {

        const tareas = this.listadoArr;
        this.mostrarListadoDeTareas( tareas );

    }


    /**
     * Muestra en consola las tareas Completadas o Pendientes, segun eleccion del usuario
     * @param { boolean } completadas 
     */
    listarTareasPorEstado( completadas = true ) {

        let tareas = [];

        if( completadas ) {

            // Muestra las tareas completadas
            tareas = this.listadoArr.filter( ({completadoEn}) => completadoEn !== null);
            this.mostrarListadoDeTareas( tareas, true );
        
        } else {
        
            // Muestra las tareas pendientes
            tareas = this.listadoArr.filter( ({completadoEn}) => completadoEn === null);
            this.mostrarListadoDeTareas( tareas );
        
        } 

    }

    
    /**
     * Muestra el listado ordenado de las tareas y su estado. El parametro "fecha" es un
     * booleano con el que se evaluara si se muestra o no la fecha en la que se completo 
     * una tarea (unicamente se enviara true cuando se quieran listar tareas completadas).
     * @param { String[] } tareas 
     * @param { boolean } fecha 
     */
    mostrarListadoDeTareas( tareas = [], fecha = false ) {

        // Linea en blanco para separa el listado de las opciones
        console.log();

        tareas.forEach( (tarea, indice) => {

            const numeroTarea = colors.green((indice + 1) +'.');
            const { desc, completadoEn } = tarea;
            const estadoTarea = ( completadoEn ) ? 
                ( fecha ) ? colors.green(completadoEn) : colors.green('Completada') 
                : colors.red('Pendiente');

            console.log(`${numeroTarea} ${desc} :: ${estadoTarea}`);

        });

    }

    /**
     * Marca como completada o pendiente una o varias tareas segun el ID de cada una
     * @param { String[] } ids 
     */
    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach( tarea => {

            if( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}


export default Tareas;