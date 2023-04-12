// Importacion de paquetes
import inquirer from 'inquirer';
import colors from 'colors';


/**
 * Crea el menu principal y retorna la opcion elegida por el usaurio
 * @returns { Promise<String> }
 */
const inquirerMenu = async() => {

    console.log('==========================='.green);
    console.log('   Seleccione una opción   '.white);
    console.log('===========================\n'.green);

    // "Questions" del paquete inquirer
    const preguntas = [
        {
            type: 'list',
            name: 'opcion',
            message: '¿Qué desea hacer?',
            choices: [
                {
                    value: '1',
                    name: `${colors.green('1.')} Crear tarea`
                },
                {
                    value: '2',
                    name: `${colors.green('2.')} Listar tareas`
                },
                {
                    value: '3',
                    name: `${colors.green('3.')} Listar tareas completadas`
                },
                {
                    value: '4',
                    name: `${colors.green('4.')} Listar tareas pendientes`
                },
                {
                    value: '5',
                    name: `${colors.green('5.')} Completar tarea(s)`
                },
                {
                    value: '6',
                    name: `${colors.green('6.')} Borrar tarea`
                },
                {
                    value: '0',
                    name: `${colors.green('0.')} Salir`
                }
            ]
        }
    ];

    // Captura la opcion elegida por el usuario
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;

}


/**
 * Detiene el flujo de la aplicacion esperando confirmacion para volver al menu principal
 */
const pausa = async() => {

    // "Questions" del paquete inquirer
    const mensajePausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `\n\nPresione ${ colors.green('ENTER') } para continuar`,
        }
    ];

    // Detiene el flujo esperando que se presione la tecla enter
    await inquirer.prompt( mensajePausa );

}


/**
 * Captura y retorna el nombre de la tarea ingresada por el usaurio
 * @param { String } textoIngresado 
 * @returns { String }
 */
const leerInput = async( textoIngresado ) => {

    // "Questions" del paquete inquirer
    const textoInput = [
        {
            type: 'input',
            name: 'texto',
            message: textoIngresado,
            validate( value ) {
                return ( value.length === 0 ? 'Por favor ingrese un valor' : true );
            }
        }
    ];

    // Captura el nombre de la tarea ingresada por el usaurio
    const { texto } = await inquirer.prompt( textoInput );
    return texto;

}

/**
 * Muestra un listado de tareas y retorna el id de las tareas completadas
 * @param { String[] } tareas 
 * @returns { String[] }
 */
const mostrarListadoCompletarTareas = async( tareas = [] ) => {

    // Crea un listado de opciones en base al listado de tareas recibido
    const opciones = tareas.map( (tarea) => {

        return {
            value: tarea.id,
            name: `${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    });

    // "Questions" del paquete inquirer
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones: ',
            choices: opciones
        }
    ];

    // Captura el id de la tarea a eliminar
    const { ids } = await inquirer.prompt( preguntas );
    return ids;

}

/**
 * Muestra un listado de tareas y retorna el id de la tarea a eliminar
 * @param { String[] } tareas 
 * @returns { String }
 */
const listarTareasABorrar = async( tareas = [] ) => {

    // Crea un listado de opciones en base al listado de tareas recibido
    const opciones = tareas.map( (tarea, indice) => {

        const numeroTarea = colors.green((indice + 1) +'.');
        return {
            value: tarea.id,
            name: `${numeroTarea} ${tarea.desc}`
        }

    });

    opciones.unshift(
        {
            value: '0',
            name: `${ colors.green('0. Cancelar') }`
        }
    );

    // "Questions" del paquete inquirer
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: opciones
        }
    ];

    // Captura el id de la tarea a eliminar
    const { id } = await inquirer.prompt( preguntas );
    return id;

}

/**
 * Muestra un mensaje de confirmacion y retorna la respuesta del usuario
 * @param { String } message 
 * @returns { boolean }
 */
const confirmarBorrarTarea = async( message ) => {

    // "Questions" del paquete inquirer
    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt( preguntas );
    return ok;

}


export {
    inquirerMenu,
    pausa,
    leerInput,
    listarTareasABorrar,
    confirmarBorrarTarea,
    mostrarListadoCompletarTareas
}