//? Ajustes










//! Aquí se haria toda la interacción con la base de datos, como yo lo había pensado seria que
//! Al cerrar la ventana se exporte este diccionario en json a alguna base de datos y que más tarde 
//! Cuando se vuelva a abrir la web se carge el json
let eventos = {}

const firebaseConfig = {
    apiKey: "AIzaSyBUfk2y50R_Z-Y6A4vZANcPpapEeoVNwcY",
    authDomain: "duit-da87f.firebaseapp.com",
    databaseURL: "https://duit-da87f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "duit-da87f",
    storageBucket: "duit-da87f.appspot.com",
    messagingSenderId: "836622854224",
    appId: "1:836622854224:web:4bf2747afa0123251a4955",
    measurementId: "G-ZMJF5EMRZF"
};



// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

//var dbRef = firebase.database().ref().child('text');
//dbRef.on('value', snap => console.log(snap.val()));