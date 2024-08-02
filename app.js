// Variables y constantes
let tablero = ["", "", "", "", "", "", "", "", ""];
let jugadorActual = "X";
let juegoActivo = true;

const celdas = document.querySelectorAll(".cell");
const botonReiniciar = document.getElementById("reiniciar");
const modal = document.getElementById('modal');
const optX = document.getElementById('btn-x');
const optO = document.getElementById('btn-o');
const resultMessage = document.getElementById('result-message');

const combinacionesGanadoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event Listeners
celdas.forEach(celda => celda.addEventListener("click", manejarClickCelda));
botonReiniciar.addEventListener("click", reiniciarJuego);

optX.addEventListener('click', () => {
    jugadorActual = 'X';
    closeModal();
});

optO.addEventListener('click', () => {
    jugadorActual = 'O';
    closeModal();
});

// Funciones
function manejarClickCelda(event) {
    const idCelda = event.target.id;
    if (tablero[idCelda] === "" && juegoActivo) {
        tablero[idCelda] = jugadorActual;
        event.target.innerText = jugadorActual;
        verificarResultado();
        jugadorActual = jugadorActual === "X" ? "O" : "X";
    }
}

function verificarResultado() {
    let rondaGanada = false;
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const [a, b, c] = combinacionesGanadoras[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            rondaGanada = true;
            break;
        }
    }

    if (rondaGanada) {
        mostrarResultado("¡El jugador " + jugadorActual + " ha ganado!");
        juegoActivo = false;
        return;
    }

    if (!tablero.includes("")) {
        mostrarResultado("¡Empate!");
        juegoActivo = false;
    }
}

function reiniciarJuego() {
    tablero = ["", "", "", "", "", "", "", "", ""];
    juegoActivo = true;
    jugadorActual = "X";
    celdas.forEach(celda => celda.innerText = "");
}

function mostrarResultado(mensaje) {
    resultMessage.innerText = mensaje;
    Swal.fire(mensaje);
}

function closeModal() {
    modal.style.display = 'none';
}

// Función para manejar la selección de jugador
function playUser() {
    celdas.forEach((celda, idx) => {
        celda.addEventListener('click', handleUserClick.bind(null, idx));
    });
}

function handleUserClick(index) {
    console.log('Celda clickeada con índice:', index);
}

// Función para la jugada de la máquina
function playMachine() {
    let optmachine;
    do {
        optmachine = getRandomNumber();
    } while (tablero[optmachine] !== '' || !juegoActivo);
    tablero[optmachine] = jugadorActual;
    validarJuego();
}

function validarJuego() {
    const ganador = verificarGanador();
    if (ganador) {
        mostrarResultado(`${ganador} gana!`);
        juegoActivo = false;
        celdas.forEach((celda) => {
            celda.removeEventListener('click', manejarClickCelda);
        });
    } else if (!tablero.includes('')) {
        mostrarResultado('Empate');
        juegoActivo = false;
        celdas.forEach((celda) => {
            celda.removeEventListener('click', manejarClickCelda);
        });
    } else {
        console.log('Pendiente');
    }
}

function verificarGanador() {
    for (const combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (tablero[a] === tablero[b] && tablero[b] === tablero[c] && tablero[a] !== '') {
            return tablero[a];
        }
    }
    return null;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

// Inicialización
playUser();

