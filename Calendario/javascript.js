const months = ["Enero", "Febrero", "Marzo", "Abríl", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var fechaActual = new Date();
var year = fechaActual.getFullYear();
var mes = fechaActual.getMonth() + 1; // PQ los meses empiezan en 0, dkw
var dia = fechaActual.getDate(); // Dias tmb pero lo pongo despues
let mesLetras = 'Diciembre';
let evento
let numero
document.getElementById('month').innerHTML = months[mes-1]
document.getElementById('year').innerHTML = year


const popup = document.querySelector('#popup')
const sendPopup = document.querySelector('.close-button')
const cancelPopup = document.querySelector('.cancel-button')

const popupB = document.querySelector('#popupB')
const sendPopupB = document.querySelector('.close-buttonB')
const cancelPopupB = document.querySelector('.cancel-buttonB')


cancelPopup.addEventListener('click', () => {popup.close()});
cancelPopupB.addEventListener('click', () => {popupB.close()});


function borrarEvento(dia){
    resetearEventosABorrar()
    popupB.showModal();
    numero = dia.querySelector('p').innerHTML
    const nEventos = eventos[`${numero}.${mes}.${year}`].length
    for (let x = 0; x < nEventos; x+=1){
        var borrador = document.getElementById('borrarType');
        var nuevoBorrador = borrador.cloneNode(true);
        nuevoBorrador.style.opacity = 1;
        nuevoBorrador.style.position = 'relative';
        nuevoBorrador.querySelector('.eventoABorrar').innerHTML = eventos[`${numero}.${mes}.${year}`][x][1];
        confirmar = nuevoBorrador.querySelector('#check').checked;
        console.log(confirmar)
        document.getElementById('borrarDiv').appendChild(nuevoBorrador)
    };
    return confirmar, nuevoBorrador
};

function borrarSeleccion(){
    aBorrar = document.forms['formalB']['nombreEventoB'].value;
    console.log(aBorrar)
};





function añadirEvento(dia){
    document.getElementById('maxChar').innerHTML = ''
    document.getElementById('maxHora').innerHTML = ''
    numero = dia.querySelector('p').innerHTML
    document.getElementById('titulo').innerHTML = numero + ' de ' + mesLetras;
    evento = dia
    popup.showModal();
};


function editarDia(elementoDia, texto, hora, duracion, allDay){
    var parrafo = document.getElementById('evenTry');
    var nuevoparrafo = parrafo.cloneNode(true);
    nuevoparrafo.style.opacity = 1;
    nuevoparrafo.style.position = 'relative';
    var parrafosclonados = nuevoparrafo.getElementsByTagName('p');
    if (allDay == false){
        parrafosclonados[0].textContent = `${texto} (${duracion}h)`;
    }
    else{
        parrafosclonados[0].textContent = `${texto}`;
    }
    parrafosclonados[1].textContent = hora;

    elementoDia.appendChild(nuevoparrafo)
}


sendPopup.addEventListener('click', () => {
    let nombreEvento = document.forms['formal']['nombreEvento'].value;
    let horaEvento = document.forms['formal']['tiempoEvento'].value;
    let duracionEvento = document.forms['formal']['duracionEvento'].value;
    const maxEventos = 7
    let long
    let crearEvento = false
    try {
        long = eventos[`${numero}.${mes}.${year}`].length
    } catch {
        long = 0
    };
    //console.log(nombreEvento)
    if (nombreEvento.length <= 18 & nombreEvento.length > 0 & (duracionEvento == '' || Number(duracionEvento) <= 24) & long < maxEventos)
        {if (horaEvento != '' & duracionEvento != '' & duracionEvento > 0){
            allDay = false
            editarDia(evento, nombreEvento, horaEvento, duracionEvento, allDay)
            crearEvento = true
            popup.close()
        }
        else if (horaEvento == '' & duracionEvento == ''){
            allDay = true
            editarDia(evento, nombreEvento, horaEvento, duracionEvento, allDay)
            crearEvento = true
            popup.close()
        }}
        else{
            document.getElementById('maxChar').innerHTML = 'El nombre del evento debe ser de maximo 18 caracteres'
            document.getElementById('maxHora').innerHTML = 'La duración del evento no debe superar 24 horas'
        };
        if (crearEvento == true) {
            if (eventos[`${numero}.${mes}.${year}`] != null){
            if (long < maxEventos){
                eventos[`${numero}.${mes}.${year}`].push([evento, nombreEvento, horaEvento, duracionEvento, allDay]);
            } else {
                alert('No se pueden tener más de 7 eventos.\n\nIntenta borrar algo de menor importancia.\n')
            }
        }
        else{
            eventos[`${numero}.${mes}.${year}`] = [];
            eventos[`${numero}.${mes}.${year}`].push([evento, nombreEvento, horaEvento, duracionEvento, allDay]);
        };
    };
        //console.log(eventos);
})

sendPopupB.addEventListener('click', () => {
    borrarSeleccion()
    popupB.close()
});





function obtenerDiasEnMes(mes, año) {
    const ultimoDiaDelMes = new Date(año, mes, 0).getDate();
    return ultimoDiaDelMes;
}

function resetearEventosCargados(){
    var elementosAEliminar = document.querySelectorAll('.evenTry');
    for (var i = 1; i < elementosAEliminar.length; i++) {
        elementosAEliminar[i].remove();
    };
};
function resetearEventosABorrar(){
    var elementosAEliminar = document.querySelectorAll('.borrarType');
    for (var i = 1; i < elementosAEliminar.length; i++) {
        elementosAEliminar[i].remove();
    };
};

function cargarMes(){
    resetearEventosCargados()
    diasEnMes = obtenerDiasEnMes(mes, year);
    losDias = document.getElementsByClassName('dia')
    let aCargar
    for (let x = 0; x < losDias.length; x+=1){
        if (x < diasEnMes){
            try {
                aCargar = eventos[`${x+1}.${mes}.${year}`]
                for (let y = 0; y < aCargar.length; y+=1)
                editarDia(aCargar[y][0], aCargar[y][1], aCargar[y][2], aCargar[y][3], aCargar[y][4])
            } catch {}
            finally {
                losDias[x].innerHTML = x+1;
            }
        }
        else{
            losDias[x].innerHTML = '';
        }
    };
};





function nextMonth(){
    if (mes == 12) {mes = 1;year += 1;} else {mes += 1;};
    document.getElementById('month').innerHTML = months[mes-1];
    document.getElementById('year').innerHTML = year;
    cargarMes();
    
};
function previousMonth(){
    if (mes == 1) {mes = 12;year -= 1;} else {mes -= 1;};
    document.getElementById('month').innerHTML = months[mes-1];
    document.getElementById('year').innerHTML = year;
    cargarMes();
};



cargarMes();