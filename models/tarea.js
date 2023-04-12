// Importacion de paquetes
import { v4 as uuidv4 } from 'uuid';

class Tarea {

    /**
     * Crea una nueva instancia de la clase tarea
     * @param { String } desc 
     * @returns { Tarea }
     */
    static crearNuevaTarea( desc ) {
        const id = uuidv4();
        const completadoEn = null;
        return new Tarea( id, desc, completadoEn );
    }


    /**
     * Crea una nueva instancia de la clase tarea
     * @param { String } id 
     * @param { String } desc 
     * @param { Date } completadoEn 
     * @returns { Tarea }
     */
    static crearTareaDesdeDB( id, desc, completadoEn ) {
        return new Tarea( id, desc, completadoEn );
    }
    

    constructor( id, desc, completadoEn ) {
        this.id = id;
        this.desc = desc;
        this.completadoEn = completadoEn;
    }

}

export default Tarea;