let mes = 'Diciembre';
let evento = null
const popup = document.querySelector('#popup')
const closePopup = document.querySelector('.close-button')
const cancelPopup = document.querySelector('.cancel-button')

cancelPopup.addEventListener('click', () => {
    popup.close()
})



function añadirEvento(dia){
    let eventoTexto = String;
    let eventoFecha = Array;
    let numero = dia.querySelector('p').innerHTML
    popup.showModal();
    document.getElementById('titulo').innerHTML = numero + ' de ' + mes;
    evento = dia
}


function editarDia(elementoDia, texto, hora, duracion, allDay){
    //var nuevoparrafo = document.createElement('div');
    //nuevoparrafo.innerHTML = texto + String(hora) + String(duracion)
    //nuevoparrafo.style.backgroundColor = 'red';
    //nuevoparrafo.style.position = 'absolute;'
    //nuevoparrafo.style.left = 0;
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
            editarDia(evento, nombreEvento, horaEvento, duracionEvento, false)
            popup.close()
        }
        else if (horaEvento == '' & duracionEvento == ''){
            editarDia(evento, nombreEvento, horaEvento, duracionEvento, true)
            popup.close()
        }}

})


console.log('dwadwajdwahjdkawhhwakd'.length)

