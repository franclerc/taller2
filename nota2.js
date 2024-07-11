/*   PUNTUACION */
    
    // Variables para las estrellas
    var estrellas = document.querySelectorAll('.estrella');

    // Función para actualizar las estrellas
    function actualizarEstrellas(index) {
        estrellas.forEach(function(estrella, i) {
            if (i < index) {
                estrella.src = 'imagen/EstrellaLlena.png';
            } else {
                estrella.src = 'imagen/Estrella.png';
            }
        });
    }

    // Agregar event listeners a cada estrella
    estrellas.forEach(function(estrella) {
        estrella.addEventListener('click', function() {
            var index = parseInt(estrella.getAttribute('data-index'));
            actualizarEstrellas(index);
        });
    });

    // Función para inicializar las estrellas (opcional, si deseas mantener el estado al recargar)
    function inicializarEstrellas() {
        // Supongamos que guardamos el índice de la última estrella seleccionada en localStorage
        var ultimoIndice = localStorage.getItem('ultimaPuntuacion');
        if (ultimoIndice) {
            actualizarEstrellas(parseInt(ultimoIndice));
        }
    }

    // Guardar la última puntuación en localStorage
    estrellas.forEach(function(estrella) {
        estrella.addEventListener('click', function() {
            var index = parseInt(estrella.getAttribute('data-index'));
            localStorage.setItem('ultimaPuntuacion', index);
        });
    });

    // Inicializar las estrellas al cargar la página
    window.onload = function() {
        inicializarEstrellas();
    };

    // Limpiar el almacenamiento local al salir de la página (opcional)
    window.onunload = function() {
        localStorage.removeItem('ultimaPuntuacion');
    };
   
/* BOTON LISTA DE SEGUIMIENTO */


// JavaScript para mostrar/ocultar el menú desplegable
const textodelista = document.getElementById('textodelista');
const dropdownMenu = document.getElementById('dropdownMenu');

textodelista.addEventListener('click', function() {
    dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
});




// Mostrar popup
function showPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';
}

// Cerrar popup
function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}




// Procesar formulario de nueva lista
document.getElementById('newListForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar envío del formulario por defecto

    // Obtener valores del formulario
    var listName = document.getElementById('listName').value;
    var listDescription = document.getElementById('listDescription').value;

    // Aquí puedes procesar los datos, por ejemplo, enviarlos a tu backend o hacer lo que necesites
    console.log('Nombre de lista:', listName);
    console.log('Descripción:', listDescription);

    // Mostrar feedback
    mostrarFeedback();

    // Cambiar el botón después de añadir
    cambiarBoton();

    // Cerrar el popup después de procesar
    closePopup();
});

// Función para mostrar el feedback
function mostrarFeedback() {
    var feedback = document.getElementById('feedback');
    feedback.classList.remove('oculto');

    // Ocultar feedback después de 4 segundos
    setTimeout(function() {
        feedback.classList.add('oculto');
    }, 4000);
}





// Función para cambiar el estilo y texto del botón
function cambiarBoton() {
    var addToListButton = document.getElementById('addToListButton');
    addToListButton.classList.remove('listadeseguimiento');
    addToListButton.classList.add('btn-grey');
    addToListButton.querySelector('h5').textContent = '¡AÑADIDO A LA LISTA!';
}

// Obtén los elementos del formulario y el botón
var listNameInput = document.getElementById('listName');
var crearListaBtn = document.getElementById('crearListaBtn');

// Escucha cambios en el input del nombre de la lista
listNameInput.addEventListener('input', toggleButton);

// Función para activar/desactivar el botón basado en el nombre de la lista
function toggleButton() {
    if (listNameInput.value.trim() !== '') {
        crearListaBtn.classList.remove('btn-disabled');
        crearListaBtn.classList.add('btn-enabled');
    } else {
        crearListaBtn.classList.remove('btn-enabled');
        crearListaBtn.classList.add('btn-disabled');
    }
}





/*  ENCUESTA */

   document.addEventListener('DOMContentLoaded', function() {
    // Selección de opciones de la encuesta
    var opcionesEncuesta = document.querySelectorAll('.opcionEncuesta');

    opcionesEncuesta.forEach(function(opcion) {
        opcion.addEventListener('click', function() {
            // Cambiar imagen de ellipsevacia.png a ellipsellena.png
            opcion.src = 'imagen/ellipsellena.png';

            // Guardar la opción seleccionada en localStorage
            localStorage.setItem('opcionSeleccionada', opcion.alt);
        });
    });

    // botón "VOTAR"
    var botonVotar = document.querySelector('.botonvotar');
    botonVotar.addEventListener('click', function() {
        // Obtener la opción seleccionada desde localStorage
        var opcionSeleccionada = localStorage.getItem('opcionSeleccionada');

        // Actualizar dinámicamente el contenido de la encuesta
        var encuestaContainer = document.getElementById('encuestaContainer');
        encuestaContainer.innerHTML = `
            <p>¡GRACIAS POR TU VOTO!</p> 
            <P>Tu opinión es muy importante para</p>
            <p>nosotros. ¡Sigue participando en </p>
            <p>nuestras encuestas para ayudarnos</p>
            <p>a mejorar nuestro contenido!</p>
        `;
    });
});
