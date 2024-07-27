let isCircleTurn = false;
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const winningMessageTextElement = document.getElementById('winningMessage');
const messageContainer = document.getElementById('message-container');
const restartButton = document.getElementById('restartButton');


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


function startGame() {
    isCircleTurn = false; 
    cells.forEach(cell => {
        cell.textContent = ''; 
        cell.removeEventListener('click', handleClick); 
        cell.addEventListener('click', handleClick, { once: true }); 
    });
    setBoardHoverClass(); 
    messageContainer.style.display = 'none'; 
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'O' : 'X';

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass(); 
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass;
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('o');
    if (isCircleTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

function endGame(draw) {
    if (draw) {
        showAlert('¡Es un empate!', 'Intenten de nuevo para ver quién es el ganador.', 'info');
    } else {
        showAlert(`¡${isCircleTurn ? "O" : "X"} has ganado!`, '¡Felicidades al ganador de esta partida!', 'success');
    }
    messageContainer.style.display = 'block'; 
}

function showAlert(title, text, icon) {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: 'Jugar de nuevo',
        confirmButtonColor: '#0653f8',
        background: '#e0f7fa',
        }
    ).then(() => {
        startGame(); 
    });
}

restartButton.addEventListener('click', startGame);

startGame();