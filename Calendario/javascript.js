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
cancelPopupB.addEventListener('click', () => {popupB.close(); resetearEventosABorrar();});


function borrarEvento(dia){
    resetearEventosABorrar()
    popupB.showModal();
    numero = dia.querySelector('p').innerHTML
    let nEventos
    try {
        nEventos = eventos[`${numero}.${mes}.${year}`].length
    } catch {
        nEventos = 0
    };
    for (let x = 0; x < nEventos; x+=1){
        var borrador = document.getElementsByClassName('borrarType')[0];
        var nuevoBorrador = borrador.cloneNode(true);
        nuevoBorrador.style.opacity = 1;
        nuevoBorrador.style.position = 'relative';
        nuevoBorrador.querySelector('.eventoABorrar').innerHTML = eventos[`${numero}.${mes}.${year}`][x][1];
        document.getElementById('borrarDiv').appendChild(nuevoBorrador)
    };
};

function borrarSeleccion(){
    const selecion = document.getElementsByClassName('borrarType');
    let del = []
    let texto
    let activado
    for (let x = 1; x <= selecion.length; x += 1){
        //console.log(`${x} de ${selecion.length}`);
        texto = selecion[x-1].getElementsByTagName('p')[0].textContent;
        activado = selecion[x-1].getElementsByTagName('input')[0].checked;
        if (activado){
            del.push(texto)
        };
    };
    //console.log(del);
    let max = 0;
    while (del.length > 0){
        let evL = eventos[`${numero}.${mes}.${year}`].length
        for (let x = 0; x < evL; x++){
            if (eventos[`${numero}.${mes}.${year}`][x].includes(del[0])) {
                eventos[`${numero}.${mes}.${year}`].splice(x, 1);
                del.splice(0, 1);
                break;
            };
        };
        max++;
        if (max > 9){
            console.log('pallorar')
            break;
        };
    };  
    resetearEventosABorrar();
    cargarMes();
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

    elementoDia.appendChild(nuevoparrafo);
};


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
                console.log([evento, nombreEvento, horaEvento, duracionEvento, allDay])
            } else {
                alert('No se pueden tener más de 7 eventos.\n\nIntenta borrar algo de menor importancia.\n')
            }
        }
        else{
            eventos[`${numero}.${mes}.${year}`] = [];
            eventos[`${numero}.${mes}.${year}`].push([evento, nombreEvento, horaEvento, duracionEvento, allDay]);
            console.log([evento, nombreEvento, horaEvento, duracionEvento, allDay])
            console.log(numero, mes, year)
        };
    };
        //console.log(eventos);
})

sendPopupB.addEventListener('click', () => {
    borrarSeleccion()
    resetearEventosABorrar()
    cargarMes()
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
    var elementosAEliminar = document.getElementsByClassName('borrarType');
    for (var i = 1; i < elementosAEliminar.length; i++) {
        //console.log(`Se ha borrado ${elementosAEliminar[i]} En teoria`);
        elementosAEliminar[i].remove();
    };
};

function cargarMes(){
    resetearEventosCargados()
    diasEnMes = obtenerDiasEnMes(mes, year);
    losDias = document.getElementsByClassName('dia')
    const d = new Date(year, mes, -diasEnMes+1);
    let empieza = d.getDay();
    let diasPuestos = 1;
    let aCargar
    for (let x = 0; x < losDias.length; x+=1){
        if (diasPuestos <= diasEnMes & x > empieza){
            try {
                aCargar = eventos[`${diasPuestos}.${mes}.${year}`]
                for (let y = 0; y < aCargar.length; y+=1)
                editarDia(aCargar[y][0], aCargar[y][1], aCargar[y][2], aCargar[y][3], aCargar[y][4])
            } catch {}
            finally {
                losDias[x].innerHTML = diasPuestos;
                diasPuestos += 1;
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

function modoOscuro(){
    alert('Proximamente');
};


//////////////////////////////////////////?
////////////////? Ajustes ¿////////////////
//////////////////////////////////////////?
const popupS = document.querySelector('#popupS')
const sendPopupS = document.querySelector('.close-buttonS')
const cancelPopupS = document.querySelector('.cancel-buttonS')

cancelPopupS.addEventListener('click', () => {popupS.close()});


function openSettings(){
    popupS.showModal();
};


sendPopupS.addEventListener('click', () => {
    getSettings();
    loadSettings();
    popupS.close();
});


//="fondo1"
//="fondo2"
//="header"
//="eventos"
//="animacion"



let listilla = document.querySelectorAll('tr');
//console.log(listilla[6])


//.par td{
//    background-color: black;
//    border-color: black;
//  }



function getSettings(){
    preferencias['header'] = document.forms['formalS']['header'].value;
    preferencias['background1'] = document.forms['formalS']['fondo1'].value;
    preferencias['eventColor'] = document.forms['formalS']['eventos'].value;

};



function loadSettings(){
    document.querySelectorAll('th').forEach(e => e.style.backgroundColor = preferencias['header']);
    document.querySelectorAll('body').forEach(e => e.style.backgroundColor = preferencias['background1']);
    //document.querySelectorAll('th').forEach(e => e.style.backgroundColor = preferencias['header']);
    document.querySelectorAll('.evenTry').forEach(e => e.style.backgroundColor = preferencias['eventColor']);
    document.getAnimations('cambioColor').forEach(e => e.style.backgroundColor = preferencias['resaltado']);
};


//? Ajustes
let preferencias = {
    'header' : 'red',
    'background1' : '#d8e4ee',
    'background2' : '#d8daea',
    'eventColor' : 'greenyellow',
    'resaltado' : 'turquoise'
};



loadSettings();
cargarMes();

/*########################################################*/
/*##################Para la base de datos?################*/
/*########################################################*/