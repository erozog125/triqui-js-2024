//================================= Constantes ========================//

const ESTADO_TITULO = document.querySelector('.tittle2'); // Elemento donde se mostrará el estado del juego

const JUEGO = ['', '', '', '', '', '', '', '', '']; // Array que representa el estado actual del tablero 

const GANADORES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]; // Posibles combinaciones ganadoras

const GANADOR = (currentPlayer) => `El jugador ${currentPlayer} ha ganado`; // Mensaje para el jugador ganador
const EMPATE = () => 'El juego terminó en empate'; // Mensaje para empate
const TURNO = (currentPlayer) => `Turno del jugador ${currentPlayer}`; // Mensaje para indicar el turno

//=========================== Variables =================//

let gameActive = true; // Estado del juego, activo o inactivo
let currentPlayer = 'X'; // Jugador actual

//======================== Funciones =================//

/**
 * Inicializa el juego, configurando el estado inicial y los oyentes de eventos.
 */
function main() {
    handleStatusDisplay(TURNO(currentPlayer)); // Muestra el mensaje del turno inicial
    listeners(); // Configura los oyentes de eventos
}

main();


//  Actualiza el mensaje del estado del juego.
 
 
function handleStatusDisplay(message) {
    ESTADO_TITULO.innerHTML = message;
}


//  Configura los oyentes de eventos para las celdas del tablero y el botón de reinicio.
 
function listeners() {
    document.querySelector('.board').addEventListener('click', handleCellClick); // Escucha clics en las celdas del tablero
    document.querySelector('.game-restart').addEventListener('click', handleRestartGame); // Escucha clics en el botón de reinicio
}


function handleCellClick(clickedEvent) {
    const clickedCell = clickedEvent.target; // Celda que se ha clicado
    const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell); // Índice de la celda clicada

    if (JUEGO[clickedCellIndex] !== '' || !gameActive) {
        return; // No hace nada si la celda ya está ocupada o el juego no está activo
    }

    handleCellPlayed(clickedCell, clickedCellIndex); // Procesa la jugada
    handleResultValidation(); // Valida el resultado del juego
}

//Actualiza el estado del juego y la visualización de la celda jugada.

function handleCellPlayed(clickedCell, clickedCellIndex) {
    JUEGO[clickedCellIndex] = currentPlayer; // Actualiza el estado del juego
    clickedCell.innerHTML = currentPlayer; // Muestra el símbolo del jugador en la celda
}

//Valida si hay un ganador o un empate, y actualiza el estado del juego en consecuencia.
 
function handleResultValidation() {
    let roundWon = false;

    for (let i = 0; i < GANADORES.length; i++) {
        const winCondition = GANADORES[i];
        let a = JUEGO[winCondition[0]];
        let b = JUEGO[winCondition[1]];
        let c = JUEGO[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Salta a la siguiente iteración si alguna celda está vacía
        }
        if (a === b && b === c) {
            roundWon = true; // Establece que hay un ganador si las celdas coinciden
            break;
        }
    }

    if (roundWon) {
        handleStatusDisplay(GANADOR(currentPlayer)); // Muestra el mensaje de ganador
        gameActive = false; // Desactiva el juego
        return;
    }

    let roundDraw = !JUEGO.includes(''); // Comprueba si todas las celdas están llenas
    if (roundDraw) {
        handleStatusDisplay(EMPATE()); // Muestra el mensaje de empate
        gameActive = false; // Desactiva el juego
        return;
    }

    handlePlayerChange(); // Cambia al siguiente jugador
}

//Cambia al jugador actual.

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Cambia el jugador
    handleStatusDisplay(TURNO(currentPlayer)); // Muestra el mensaje del turno del siguiente jugador
}

// Reinicia el juego a su estado inicial.

function handleRestartGame() {
    gameActive = true; // Activa el juego
    currentPlayer = 'X'; // Establece el jugador inicial
    JUEGO.fill(''); // Limpia el estado del juego
    handleStatusDisplay(TURNO(currentPlayer)); // Muestra el mensaje del turno inicial
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = ''); // Limpia las celdas del tablero
}
