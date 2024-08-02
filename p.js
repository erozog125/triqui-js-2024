const btnX = document.getElementById('btnX');
const btnY = document.getElementById('btnY');
let user = '';
let both = '';
let gameStarted = false;
let gameOver = false;
let boardGame = ["","","","","","","","",""];

function disableButtons() {
    btnX.disabled = true;
    btnY.disabled = true;
}

function enableButtons() {
    btnX.disabled = false;
    btnY.disabled = false;
}

btnX.addEventListener('click', () => {
    if (!gameStarted) {
        user = "X";
        both = "O";
        console.log(user);
        disableButtons();
        gameStarted = true;
    }
});

btnY.addEventListener('click', () => {
    if (!gameStarted) {
        user = "O";
        both = "X";
        console.log(user);
        disableButtons();
        gameStarted = true;
    }
});

const board = document.querySelectorAll('.cell');

board.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (!gameOver && cell.textContent === "" && gameStarted) {
            cell.textContent = user;
            boardGame[index] = user;
            validateGame();
            if (!gameOver) {
                setTimeout(() => {
                    playMachine();
                }, 1000);
            }
        }
    });
});

function validateGame() {
    const winner = checkWinner();
    if (winner) {
        gameOver = true;
        showResult(`${winner === user ? 'Usuario' : 'Máquina'} gana esta ronda!`);
    } else if (!boardGame.includes('')) {
        gameOver = true;
        showResult('Empate en esta ronda');
    } else {
        console.log('pendiente');
    }
}

function checkWinner() {
    const combinations = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    
    for (const combination of combinations) {
        const [a, b, c] = combination;
        if (boardGame[a] && boardGame[a] === boardGame[b] && boardGame[a] === boardGame[c]) {
            return boardGame[a];
        }
    }
    return null;
}

function showResult(message) {
    Swal.fire({
        title: message,
        text: 'Haz clic en "Reiniciar" para jugar de nuevo',
        icon: 'info',
        confirmButtonText: 'Reiniciar',
    }).then((result) => {
        if (result.isConfirmed) {
            resetGame();
        }
    });
}

function resetGame() {
    gameStarted = false;
    gameOver = false;
    enableButtons();
    board.forEach(cell => {
        cell.textContent = "";
    });
    boardGame = ["","","","","","","","",""];
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

function playMachine() {
    let turnMachine;
    do {
        turnMachine = getRandomNumber();
    } while (boardGame[turnMachine] !== "");
    
    board[turnMachine].textContent = both;
    boardGame[turnMachine] = both;
    validateGame();
}

const resetButton = document.getElementById('resetGame');
resetButton.addEventListener('click', resetGame);