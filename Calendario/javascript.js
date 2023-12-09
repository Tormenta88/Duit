const popup = document.querySelector('#popup')
const closePopup = document.querySelector('.close-button')

closePopup.addEventListener('click', () => {
    let guardado = document.forms['formal']['agarrar'].value;
    document.getElementById('casualmente').innerHTML = guardado
    console.log(guardado)
    popup.close()

})

let mes = 'Diciembre';


function añadirEvento(dia){
    let eventoTexto = String;
    let eventoFecha = Array;
    popup.showModal();
    document.getElementById('titulo').innerHTML = dia + ' de ' + mes;
}


function editarDia(elementoDia){
    var nuevoparrafo = document.createElement('div');
    nuevoparrafo.innerHTML = 'ciertamente'
    nuevoparrafo.style.backgroundColor = 'red';
    nuevoparrafo.style.position = 'absolute;'
    nuevoparrafo.style.left = 0;
    elementoDia.appendChild(nuevoparrafo)
    let dia =  Number(elementoDia.querySelector('p').innerHTML)
    elementoDia.querySelector('p').innerHTML = dia+1
}

