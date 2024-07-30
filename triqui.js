const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let playerSymbol = 'X';
let computerSymbol = 'O';
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'player';

// Inicializar el juego
initGame();

// Función para inicializar el juego
function initGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => makeMove(index));
    });
    resetButton.addEventListener('click', resetGame);
    renderBoard();
}

// Renderizar el tablero
function renderBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        cell.style.pointerEvents = board[index] === '' ? 'auto' : 'none';
    });
}

// Manejar el movimiento del jugador
function makeMove(index) {
    if (board[index] === '' && currentPlayer === 'player') {
        board[index] = playerSymbol;
        currentPlayer = 'computer';
        renderBoard();
        if (checkWin(playerSymbol)) {
            alert('¡Has ganado!');
            resetGame();
        } else if (board.includes('')) {
            setTimeout(computerMove, 500);
        } else {
            alert('¡Es un empate!');
            resetGame();
        }
    }
}

// Movimiento de la computadora
function computerMove() {
    let availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[randomIndex] = computerSymbol;
    currentPlayer = 'player';
    renderBoard();
    if (checkWin(computerSymbol)) {
        alert('¡La computadora ha ganado!');
        resetGame();
    } else if (!board.includes('')) {
        alert('¡Es un empate!');
        resetGame();
    }
}

// Verificar si hay un ganador
function checkWin(symbol) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === symbol);
    });
}

// Reiniciar el juego
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'player';
    renderBoard();
}