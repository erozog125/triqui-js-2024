const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

function handleClick(index) {
    if (!gameActive || cells[index].innerHTML !== '') return;

    cells[index].innerHTML = currentPlayer;
    if (checkWinner()) {
        gameActive = false;
        const winner = currentPlayer === 'X' ? 'Jugador' : 'Máquina';
        setTimeout(() => alert(`${winner} gana!`), 10);
        return;
    } 

    if ([...cells].every(cell => cell.innerHTML !== '')) {
        gameActive = false;
        setTimeout(() => alert('¡Empate!'), 10);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive && currentPlayer === 'O') {
        setTimeout(simulateMachineMove, 500); 
    }
}

function simulateMachineMove() {
    let emptyCells = [];
    cells.forEach((cell, index) => {
        if (cell.innerHTML === '') {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return; 

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const machineMove = emptyCells[randomIndex];
    cells[machineMove].innerHTML = currentPlayer;

    if (checkWinner()) {
        gameActive = false;
        const winner = currentPlayer === 'X' ? 'Jugador' : 'Máquina';
        setTimeout(() => alert(`${winner} gana!`), 10);
        return;
    }

    if ([...cells].every(cell => cell.innerHTML !== '')) {
        gameActive = false;
        setTimeout(() => alert('¡Empate!'), 10);
    }

    currentPlayer = 'X'; 
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winConditions.some(condition => {
        let [a, b, c] = condition;
        return cells[a].innerHTML !== '' &&
               cells[a].innerHTML === cells[b].innerHTML &&
               cells[a].innerHTML === cells[c].innerHTML;
    });
}

function resetGame() {
    cells.forEach(cell => cell.innerHTML = '');
    currentPlayer = 'X';
    gameActive = true;
}