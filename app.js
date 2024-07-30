// Creación de las variables
let currentPlayer = 'X';
let playerSymbol = 'X';
const cells = document.querySelectorAll('.cell');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Función para que funcione el clic en una celda
function handleClick(event) {
    const cell = event.target;
    
    // Verificar si la celda ya está ocupada
    if (cell.textContent !== '') {
        return;
    }

    // Marcar la celda con el jugador actual
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    // Verificar si hay un ganador
    if (checkWinner()) {
        setTimeout(() => {
            alert(`Jugador ${currentPlayer} GANA!`);
            resetBoard();
        }, 100);
        return;
    }

    // Verificar si hay un empate
    if (checkDraw()) {
        setTimeout(() => {
            alert('ES UN EMPATE!');
            resetBoard();
        }, 100);
        return;
    }

    // Alternar al siguiente jugador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Función para verificar si hay un ganador
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Función para verificar si hay un empate
function checkDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

// Función para reiniciar el tablero en cualquier momento
function resetBoard() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = playerSymbol;
}

// Función para manejar la elección del símbolo por el jugador
function chooseSymbol(symbol) {
    playerSymbol = symbol;
    currentPlayer = symbol;
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.board').style.display = 'grid';
    document.querySelector('.controls').style.display = 'block';
}

// Añadir event listeners a las celdas
cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});