// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos');


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
}


// Classes
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}
class UI{

}

let presupuesto; 
// instanciar UI
const ui = new UI();

// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu Presupuesto?');

    console.log(Number(presupuestoUsuario)); //me tranforma a numero
    console.log(isNaN(presupuestoUsuario)); //me dice si es un numero o no en boolean

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload(); //me refresca la pagina
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto); 
}