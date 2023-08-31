// Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

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
        // console.log(this.gastos);

        this.calcularRestante();
    }

    calcularRestante(){
        let sumaGastos = this.gastos.reduce( (total, gasto)=> total + gasto.cantidad,0);

        // console.log(sumaGastos);

        this.restante = this.presupuesto - sumaGastos;
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
        this.verificarExistente('alerta-gastos');

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

    mostrarListado( listado ){
        // console.log(listado);
        // limpia el html del contenedor (ul)
        this.limpiarHTML();        

        listado.forEach(elemento => {

            // destructuring en elemento
            const {nombre, cantidad, id} = elemento;

            const item = document.createElement('li');

            // className, diferente sintaxis a classlist, mismo funcionamiento
            item.className = 'list-group-item d-flex justify-content-between align-items-center';

            // agregar data atributtes 2 maneras distintas
            item.dataset.id = id;
            // item.setAttribute('data-id', id);


            item.innerHTML= `
                <span>${nombre}</span>
                <span class="badge badge-primary badge-pill">${cantidad}</span>
                <button class="btn btn-danger borrar-gasto">Borrar &times</button>

            `;

            gastoListado.appendChild(item);
        });


    }
    actualizarRestante(restante){
        document.querySelector('#restante').textContent = restante;


        if (restante <= 0) {
            const btnAgregar = formulario.querySelector('button');
            btnAgregar.disabled = true;
        }
    }
    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');

        // comprobar 25% 
        if ( (presupuesto / 4 ) >= restante ) {

            restanteDiv.classList.remove('alert-sucess', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
            
        }
        // comprobar 50%
        if ( (presupuesto / 2) >= restante ) {
            restanteDiv.classList.remove('alert-sucess');
            restanteDiv.classList.add('alert-warning');
        }
    }

    verificarExistente(clase) {
        const alert = document.querySelector(`.${clase}`);
        if (alert) {
            alert.remove();
        }
    }
    limpiarHTML(){
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
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

    // si un gasto vale mas del restante no podemos agregarlo
    const restante = Number(document.querySelector('#restante').textContent);

    console.log(restante);


    // validar
    if (nombre === '' || cantidad === '') {
        ui.mostrarAlerta('Ambos campos son obligatorios', 'error');
        return;
        
    } else if (cantidad <= 0 || isNaN(cantidad) || cantidad > restante) {
        ui.mostrarAlerta('Cantidad no valida', 'error');
        return;
    }

    
    ui.mostrarAlerta('Gasto agregado Correctamente');
    // Generar objeto con el gasto (Object Literal Enhancement), contrario al destructuring este me incrusta variables al objeto.
    const gasto = {nombre, cantidad, id: Date.now(),};

    // llamando a el objeto de la instancia 'presupuesto'
    presupuesto.nuevoGasto(gasto);

    // imprimir el listado de gastos
    ui.mostrarListado(presupuesto.gastos);

    // actualizar el restante del presupuesto
    ui.actualizarRestante(presupuesto.restante);

    // cambiar color de restante
    ui.comprobarPresupuesto(presupuesto);


    formulario.reset();

}