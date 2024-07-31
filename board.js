// Elementos del DOM
const board = document.querySelectorAll('.cell');
const modal = document.getElementById('modal');
const optX = document.getElementById('btn-x');
const optO = document.getElementById('btn-o');
const resultMessage = document.getElementById('result-message'); // Añade un elemento para mostrar el resultado
const resetButton = document.getElementById('reset-button'); // Corregido el ID aquí

// Estado del juego
let user = '';
let machine = '';
let boardGame = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

// Configura los eventos de los botones de selección de jugador
optX.addEventListener('click', () => {
    user = 'X';
    machine = 'O';
    closeModal();
    setupGame();
});

optO.addEventListener('click', () => {
    user = 'O';
    machine = 'X';
    closeModal();
    setupGame();
});

// Cierra el modal
function closeModal() {
    modal.style.display = 'none';
}

// Configura el juego, añadiendo los manejadores de eventos a las celdas
function setupGame() {
    board.forEach((cell, idx) => {
        cell.addEventListener('click', () => handleUserClick(idx));
    });
}

// Maneja el turno de la máquina
function playMachine() {
    let optMachine;
    do {
        optMachine = getRandomNumber();
    } while (boardGame[optMachine] !== '' || isGameOver);

    board[optMachine].textContent = machine;
    boardGame[optMachine] = machine; // Actualiza el estado del juego
    validateGame(); // Valida el estado del juego después de que juegue la máquina
}

// Maneja el turno del usuario
function handleUserClick(idx) {
    if (!isGameOver && board[idx].textContent === '') {
        board[idx].textContent = user;
        boardGame[idx] = user;
        validateGame();

        if (!isGameOver) {
            setTimeout(() => {
                playMachine();
            }, 1000);
        }
    }
}

// Valida el estado del juego
function validateGame() {
    const winner = checkWinner();
    if (winner) {
        showResult(`${winner} gana!`); // Muestra quién ganó
        isGameOver = true;
        board.forEach((cell) => {
            cell.removeEventListener('click', handleUserClick);
        });
    } else if (!boardGame.includes('')) {
        showResult('Empate!');
        isGameOver = true;
        board.forEach((cell) => {
            cell.removeEventListener('click', handleUserClick);
        });
    } else {
        console.log('Pendiente');
    }
}

// Verifica si hay un ganador
function checkWinner() {
    const winningCombinations = [
        // Filas
        [0, 1, 2], 
        [3, 4, 5],
        [6, 7, 8],

        // Columnas
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        // Diagonales
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardGame[a] === boardGame[b] && boardGame[b] === boardGame[c] && boardGame[a] !== '') {
            return boardGame[a];
        }
    }
    return null;
}

// Muestra el resultado utilizando SweetAlert
function showResult(message) {
    Swal.fire(message);
}

// Obtiene un número aleatorio entre 0 y 8
function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

// Reinicia el juego
function resetGame() {
    boardGame = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;

    board.forEach(cell => {
        cell.textContent = '';
    });

    setupGame();
}

// Añade el manejador del evento al botón de reinicio
resetButton.addEventListener('click', resetGame);
