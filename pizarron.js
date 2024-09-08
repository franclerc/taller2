// Variables para llevar un seguimiento de los instrumentos seleccionados
let selectedInstruments = [];

// Función para manejar la selección/deselección de instrumentos
function toggleInstrument(instrument) {
    const button = document.getElementById(instrument + 'Button');
    const index = selectedInstruments.indexOf(instrument);

    if (index > -1) {
        selectedInstruments.splice(index, 1); // Deseleccionar si ya estaba seleccionado
        button.classList.remove('selected');
    } else {
        selectedInstruments.push(instrument); // Seleccionar
        button.classList.add('selected');
    }

    // Habilitar/deshabilitar el botón de generar canción según la selección
    document.getElementById('generateButton').disabled = selectedInstruments.length < 2;
}

function irAPaginaInicio() {
    window.location.href = 'salon.html'; // Redirige a la página salon.html
 }
 
// Función para generar la canción
function generateSong() {

    console.log('generateSong llamar');
    console.log(document.getElementById('instrumentButtons'));
    console.log(document.getElementById('generateButton'));

    if (selectedInstruments.length < 2) {
        alert('Selecciona al menos dos instrumentos.');
        return;
    }

    let songUrl = '';
    let albumUrl = '';

    // reproducir en función de los instrumentos seleccionados
    if (selectedInstruments.includes('guitarra') && selectedInstruments.includes('tambor') && selectedInstruments.includes('trompeta')) {
        songUrl = 'sonido/todos.mp3';
        albumUrl = './image/album1.png'
    } else if (selectedInstruments.includes('guitarra') && selectedInstruments.includes('tambor')) {
        songUrl = 'sonido/guitarra-tambor.mp3';
         albumUrl = './image/album2.png'
    } else if (selectedInstruments.includes('guitarra') && selectedInstruments.includes('trompeta')) {
        songUrl = 'sonido/guitarra-trompeta.mp3';
         albumUrl = './image/album3.png'
    } else if (selectedInstruments.includes('tambor') && selectedInstruments.includes('trompeta')) {
        songUrl = 'sonido/trompeta-tambor.mp3';
         albumUrl = './image/album4.png'
    }

    // reproducir la canción seleccionada
    const songPlayer = document.getElementById('songPlayer');
    const playPauseButton = document.getElementById('playPauseButton');
    const progress = document.getElementById('progress');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalTimeDisplay = document.getElementById('totalTime');

    songPlayer.src = songUrl;

    // muestra la imagen del álbum correspondiente
    const albumImage = document.getElementById('albumImage');
    const albumArt = document.getElementById('albumArt');
    albumImage.src = albumUrl;
    albumArt.style.display = 'block';
    
    // muestra el reproductor de sonido 
    document.querySelector('.audio-player').style.display = 'block';

    // oculta los botones de instrumentos y el botón de generar
    document.getElementById('instrumentButtons').style.display = 'none';
    document.getElementById('generateButton').style.display = 'none';

      // Mostrar los instrumentos seleccionados
      const instrumentosContainer = document.querySelector('.instrumentos');
      instrumentosContainer.innerHTML = ''; // Limpiar instrumentos anteriores
  
      selectedInstruments.forEach(instrument => {
          const span = document.createElement('span');
          span.classList.add('instrumento');
          span.textContent = instrument.charAt(0).toUpperCase() + instrument.slice(1); // Capitaliza el nombre del instrumento
          instrumentosContainer.appendChild(span);
      });
    
    // actualiza la duración de la canción una vez que se cargue
    songPlayer.addEventListener('loadedmetadata', () => {
        totalTimeDisplay.textContent = formatTime(songPlayer.duration);
    });

    // actualiza la barra de progreso y el tiempo actual de la canción
    songPlayer.addEventListener('timeupdate', () => {
        const percent = (songPlayer.currentTime / songPlayer.duration) * 100;
        progress.style.width = percent + '%';
        currentTimeDisplay.textContent = formatTime(songPlayer.currentTime);
    });

    // reproducir la canción seleccionada
    songPlayer.play();
    playPauseButton.textContent = 'Pause';

    // ocultar el botón de generar y mostrar el de regenerar
    document.getElementById('generateButton').style.display = 'none';
    document.getElementById('regenerateButton').style.display = 'block';

     // ocultar el título y subtítulo
 document.getElementById('crearTitulo').style.display = 'none';
 document.getElementById('subtitulo').style.display = 'none';

 // muestra el texto de "momento de escuchar" 
 document.getElementById('escucharTitulo').style.display = 'block';
}

// pausar/reanudar la canción
function togglePlayPause() {
    const songPlayer = document.getElementById('songPlayer');
    const playPauseButton = document.getElementById('playPauseButton');

    if (songPlayer.paused) {
        songPlayer.play();
        playPauseButton.textContent = 'Pause';
    } else {
        songPlayer.pause();
        playPauseButton.textContent = 'Play';
    }
}

// formatear el tiempo 
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// resetear la selección y volver al inicio
function resetSelection() {

    //la selección de instrumentos
    selectedInstruments = [];
    const instrumentButtons = document.querySelectorAll('#instrumentButtons button');
    instrumentButtons.forEach(button => button.classList.remove('selected'));
    
    // Ocultar el reproductor de audio y el botón de regenerar
    document.getElementById('songPlayer').pause();
    document.getElementById('regenerateButton').style.display = 'none';
    document.getElementById('albumArt').style.display = 'none';
    document.querySelector('.audio-player').style.display = 'none';
    
    // Restaurar los botones de instrumentos y el botón de generar
    document.getElementById('instrumentButtons').style.display = 'flex';
    document.getElementById('generateButton').style.display = 'block';
    document.getElementById('generateButton').disabled = true; // Inhabilitar hasta que se seleccionen 2 instrumentos nuevamente
    
    // Mostrar el título original y subtítulo
    document.getElementById('crearTitulo').style.display = 'block';
    document.getElementById('subtitulo').style.display = 'block';

    // Ocultar el texto "Momento de escuchar"
    document.getElementById('escucharTitulo').style.display = 'none';
}

