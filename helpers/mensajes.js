// importando el paquete colors de npm
require('colors');

const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('==========================='.green);
        console.log('   Seleccione una opción   '.green);
        console.log('===========================\n'.green);
    
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tareas(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
        // Importa readline y crea la interfaz que nos permitira interactuar con el usaurio
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // Le pide informacion al usuario y cierra la interfaz
        readline.question('Seleccione una opción: ', (opcion) => {
            readline.close();
            resolve( opcion );
        });

    });
    
}

// Funcion que permite pausar la ejecucion de la aplicacion
const pausa = () => {

    return new Promise( resolve => {

        // Importa readline y crea la interfaz que nos permitira interactuar con el usaurio
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        // Le pide informacion al usuario y cierra la interfaz
        readline.question(`\nPresione ${'ENTER'.green} para continuar`, (opcion) => {
            readline.close();
            resolve();
        });

    });


}

module.exports = {
    mostrarMenu,
    pausa
}