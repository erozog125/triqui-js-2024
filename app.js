const board = document.querySelectorAll('.cell');
const modal = document.getElementById('modal');
const optX = document.getElementById('btn-x');
const optO = document.getElementById('btn-o');
const resultMessage = document.getElementById('result-message'); // Añade un elemento para mostrar el resultado

let user = '';
let machine = '';
let boardGame = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;

optX.addEventListener('click', () => {
    user = 'x';
    machine = 'o';
    closeModal();
    playUser();
});

optO.addEventListener('click', () => {
    user = 'o';
    machine = 'x';
    closeModal();
    playUser();
});

// Función tradicional
function add(a, b) {
    return a + b;
}

// Función de flecha
const addArrow = (a, b) => a + b;

const greet = name => `Hello, ${name}!`;
console.log(greet('Alice')); // Output: Hello, Alice!

const sum = (a, b) => {
    return a + b;
};
console.log(sum(2, 3)); // Output: 5

const getCurrentYear = () => new Date().getFullYear();
console.log(getCurrentYear()); // Output: 2024 (o el año actual)

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

function multiply(x, y) {
    return x * y;
}

const multiplyArrow = (x, y) => x * y;

function playUser() {
    board.forEach((cell, idx) => {
        cell.addEventListener('click', handleUserClick.bind(null, idx));
    });
}

function handleUserClick(index) {
    console.log('Celda clickeada con índice:', index);
}

const cells = [/* Elementos del DOM */];
cells.forEach((cell, idx) => {
    cell.addEventListener('click', handleUserClick.bind(null, idx));
});

function playMachine() {
    let optmachine;
    do {
        optmachine = getRandomNumber();
    } while (boardGame[optmachine] !== '' || isGameOver);
    boardGame[optmachine] = machine;
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
        showResult(`${winner} gana!`);
        isGameOver = true;
        board.forEach((cell) => {
            cell.removeEventListener('click', handleUserClick);
        });
    } else if (!boardGame.includes('')) {
        showResult('Empate');
        isGameOver = true;
        board.forEach((cell) => {
            cell.removeEventListener('click', handleUserClick);
        });
    } else {
        console.log('Pendiente');
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

function showResult(message) {
    Swal.fire(message);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

