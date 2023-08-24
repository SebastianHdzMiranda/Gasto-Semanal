// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos');


// Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}


// Classes
class Presupuesto {
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}
class UI{

    // Metodos
    insertarPresupuesto( cantidad ){
        // console.log(cantidad); //objeto presupuesto
        const {presupuesto, restante} = cantidad;

        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    // imprimir alerta en la interface
    mostrarAlerta(mensaje, tipo){
        // verificar si existe(evitar duplicidad)
        verificarExistente('alerta-gastos');

        const div = document.createElement('div');
        div.classList.add('text-center', 'alert', 'alerta-gastos');
        if (tipo === 'error') {
            div.classList.add('alert-danger');
        } else{
            div.classList.add('alert-success');
        }
        div.innerHTML = mensaje;

        const contenedor = document.querySelector('.primario');
        contenedor.insertBefore(div, contenedor.children[1]);

        setTimeout(() => {
            div.remove();
        }, 3000);
    } 
    
}
function verificarExistente(clase) {
    const alert = document.querySelector(`.${clase}`);
    if (alert) {
        alert.remove();
    }
}
let presupuesto; 
// instanciar UI
const ui = new UI();

// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu Presupuesto?');

    // console.log(Number(presupuestoUsuario)); //me tranforma a numero
    // console.log(isNaN(presupuestoUsuario)); //is not a number, es decir verifica si un valor no es un numero

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload(); //me refresca la pagina
    }
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto); 

    ui.insertarPresupuesto(presupuesto);

}

function agregarGasto(e) {
    e.preventDefault();

    // input gasto
    const nombre = document.querySelector('#gasto').value;
    
    // input cantidad
    const cantidad = Number(document.querySelector('#cantidad').value);


    // validar
    if (nombre === '' || cantidad === '') {
        ui.mostrarAlerta('Ambos campos son obligatorios', 'error');
        
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.mostrarAlerta('Cantidad no valida', 'error');
        return;
    }

    
    ui.mostrarAlerta('Gasto agregado Correctamente');
    // Generar objeto con el gasto (Object Literal Enhancement), contrario al destructuring este me incrusta variables al objeto.
    const gasto = {nombre, cantidad, id: uuid.v4(),};

    // llamando a el objeto de la instancia 'presupuesto'
    presupuesto.nuevoGasto(gasto);

    formulario.reset();

}