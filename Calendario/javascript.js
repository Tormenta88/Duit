const months = ["Enero", "Febrero", "Marzo", "Abríl", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
var fechaActual = new Date();
var year = fechaActual.getFullYear();
var mes = fechaActual.getMonth() + 1; // PQ los meses empiezan en 0, dkw
var dia = fechaActual.getDate();
let mesLetras = 'Diciembre';
let evento
let numero


const popup = document.querySelector('#popup')
const closePopup = document.querySelector('.close-button')
const cancelPopup = document.querySelector('.cancel-button')

document.getElementById('month').innerHTML = months[mes-1]
document.getElementById('year').innerHTML = year



cancelPopup.addEventListener('click', () => {
    popup.close()
})


function añadirEvento(dia){
    document.getElementById('maxChar').innerHTML = ''
    document.getElementById('maxHora').innerHTML = ''
    let eventoTexto = String;
    let eventoFecha = Array;
    numero = dia.querySelector('p').innerHTML
    popup.showModal();
    document.getElementById('titulo').innerHTML = numero + ' de ' + mesLetras;
    evento = dia
}


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


closePopup.addEventListener('click', () => {
    let nombreEvento = document.forms['formal']['nombreEvento'].value;
    let horaEvento = document.forms['formal']['tiempoEvento'].value;
    let duracionEvento = document.forms['formal']['duracionEvento'].value;
    console.log(nombreEvento)
    if (nombreEvento.length <= 18 & nombreEvento.length > 0 & (duracionEvento == '' || Number(duracionEvento) <= 24))
        {if (horaEvento != '' & duracionEvento != '' & duracionEvento > 0){
            allDay = false
            editarDia(evento, nombreEvento, horaEvento, duracionEvento, allDay)
            popup.close()
        }
        else if (horaEvento == '' & duracionEvento == ''){
            allDay = true
            editarDia(evento, nombreEvento, horaEvento, duracionEvento, allDay)
            popup.close()
        }}
        else{
            document.getElementById('maxChar').innerHTML = 'El nombre del evento debe ser de maximo 18 caracteres'
            document.getElementById('maxHora').innerHTML = 'La duración del evento no debe superar 24 horas'
        };
        if (eventos[`${numero}.${mes}.${year}`] != null){
            eventos[`${numero}.${mes}.${year}`].push([evento, nombreEvento, horaEvento, duracionEvento, allDay]);
        }
        else{
            eventos[`${numero}.${mes}.${year}`] = [];
            eventos[`${numero}.${mes}.${year}`].push([evento, nombreEvento, horaEvento, duracionEvento, allDay]);
        }
        console.log(eventos);
})


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
    //TODO cargar todos los eventos almacenados

};





function nextMonth(){
    if (mes == 12) {mes = 1;year += 1;} else {mes += 1;}
    document.getElementById('month').innerHTML = months[mes-1];
    document.getElementById('year').innerHTML = year;
    cargarMes()
    
};
function previousMonth(){
    if (mes == 1){
        mes = 12;
        year -= 1;
    }
    else{
        mes -= 1;
    }
    document.getElementById('month').innerHTML = months[mes-1]
    document.getElementById('year').innerHTML = year
    cargarMes()
};



cargarMes()

console.log(`Hoy es ${dia} de ${months[mes-1]} del ${year}`)
var horas = fechaActual.getHours();
var minutos = fechaActual.getMinutes();
var segundos = fechaActual.getSeconds();
var horaFormateada = horas + ':' + minutos + '…' + segundos+'s';
console.log('Hora actual: ' + horaFormateada);




