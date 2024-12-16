//! Aquí se haria toda la interacción con la base de datos, como yo lo había pensado seria que
//! Al cerrar la ventana se exporte este diccionario en json a alguna base de datos y que más tarde 
//! Cuando se vuelva a abrir la web se carge el json
//? Gracias bro
let eventos = {}

function saveEventToDatabase(event) {
    fetch('http://127.0.0.1:5000/add_event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log("Event saved successfully:", data.event_id);
        } else {
            console.error("Failed to save event:", data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}


function loadEventsFromDatabase() {
    fetch('http://127.0.0.1:5000/get_events')
    .then(response => response.json())
    .then(events => {
        console.log("Loaded events:", events[events.length - 1]);
        eventos = events[events.length - 1];
        // Use the events to render the calendar
        //######
        for (const key in eventos) {
            const parentDiv = getParentDivByText(key.split(".")[0]);
            for (let i = 0; i < eventos[key].length; i++) {
                eventos[key][i][0] = parentDiv;
              };
          };
          cargarMes()
        //######
    })
    .catch(error => console.error('Error:', error));
}

loadEventsFromDatabase()

window.addEventListener('beforeunload', function(event) {
    saveEventToDatabase(eventos);
});



//?###############################################################
//?########################  TRADUCTOR  ##########################
//?###############################################################

function getParentDivByText(day) {
    const diaElements = document.querySelectorAll('.dia');
    const targetElement = Array.from(diaElements).find(el => el.textContent.trim() === day);
    return targetElement ? targetElement.closest('div') : null;
};

//cargarMes()
