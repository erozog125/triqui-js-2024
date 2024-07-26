// Variables del juego
let isCircleTurn = false; // Comienza el jugador X
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const winningMessageTextElement = document.createElement('div');
winningMessageTextElement.id = 'winningMessage';
document.body.appendChild(winningMessageTextElement);

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
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
        cell.textContent = ''; // Limpiar las celdas al inicio
    });
    winningMessageTextElement.textContent = ''; // Limpiar el mensaje al inicio
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
        winningMessageTextElement.textContent = '¡Es un empate!';
        alert('¡Es un empate!');
    } else {
        const winner = isCircleTurn ? "O" : "X";
        winningMessageTextElement.textContent = `¡${winner} ha ganado!`;
        alert(`¡${winner} ha ganado!`);
    }
    winningMessageTextElement.style.marginTop = '20px'; // Añadir margen superior al mensaje
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick); // Desactivar los clics
    });
}

// Iniciar el juego
startGame();