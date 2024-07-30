// Variables del juego
let isCircleTurn = false; // Comienza el jugador X
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const winningMessageTextElement = document.getElementById('winningMessage');
const messageContainer = document.getElementById('message-container');
const restartButton = document.getElementById('restartButton');

// Combinaciones ganadoras
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Función para iniciar el juego
function startGame() {
    isCircleTurn = false; // Reiniciar el turno
    cells.forEach(cell => {
        cell.textContent = ''; // Limpiar el contenido de las celdas
        cell.removeEventListener('click', handleClick); // Limpiar los event listeners
        cell.addEventListener('click', handleClick, { once: true }); // Agregar event listener
    });
    setBoardHoverClass(); // Actualizar el efecto hover
    messageContainer.style.display = 'none'; // Ocultar el mensaje al iniciar
}

// Manejar los clics en las celdas
function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'O' : 'X';

    // Coloca la marca (X u O)
    placeMark(cell, currentClass);

    // Verificar si alguien ha ganado
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        // Verificar si hay empate
        endGame(true);
    } else {
        // Cambiar de turno
        swapTurns();
        setBoardHoverClass(); // Actualizar el efecto hover
    }
}

// Colocar la marca en la celda
function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

// Cambiar de turno
function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

// Establecer el efecto de hover según el turno
function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('o');
    if (isCircleTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x');
    }
}

// Verificar si alguien ha ganado
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

// Verificar si hay empate
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}



// Terminar el juego y mostrar el mensaje
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = '¡Esto es un empate!';
    } else {
        winningMessageTextElement.textContent = `¡${isCircleTurn ? "O" : "X"} has ganado!`;
    }
    messageContainer.style.display = 'block'; // Mostrar el mensaje
}


// Escuchar el evento de clic en el botón de reinicio
restartButton.addEventListener('click', startGame);

// Iniciar el juego
startGame();