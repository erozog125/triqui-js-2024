const board = document.querySelectorAll('.cell');
const modal = document.getElementById('modal');
const optX = document.getElementById('btn-x');
const optO = document.getElementById('btn-o');
let user = '';
let machine = '';
let boardGame = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

optX.addEventListener('click', () => {
    user = 'X';
    machine = 'O';
    closeModal();
    playUser();
});

optO.addEventListener('click', () => {
    user = 'O';
    machine = 'X';
    closeModal();
    playUser();
});

function closeModal() {
    modal.style.display = 'none';
}

function playUser() {
    board.forEach((cell, idx) => {
        cell.addEventListener('click', handleUserClick.bind(null, idx));
    });
}

function playMachine() {
    let optMachine;
    do {
        optMachine = getRandomNumber();
    } while (boardGame[optMachine] !== '' || isGameOver);

    board[optMachine].textContent = machine;
    boardGame[optMachine] = machine;
    validateGame();
}

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

function validateGame() {
    const winner = checkWinner();
    if (winner) {
        showResult(`${winner} gana`);
        isGameOver = true;
        board.forEach((cell) => {
            cell.removeEventListener('click', handleUserClick);
        });
        setTimeout(resetGame, 1000);
    } else if (!boardGame.includes('')) {
        showResult('Empate!');
        isGameOver = true;
        board.forEach((cell) => {
            cell.removeEventListener('click', handleUserClick);
        });
        setTimeout(resetGame, 1000);
    } else {
        console.log('pendiente');
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardGame[a] === boardGame[b] && boardGame[b] === boardGame[c] && boardGame[a] !== '') {
            return boardGame[a];
        }
    }
    return null;
}

function showResult(message) {
    Swal.fire(message);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

function resetGame() {
    boardGame = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    board.forEach((cell) => {
        cell.textContent = '';
    });
    modal.style.display = 'flex';
}
