const board = document.querySelectorAll(".cell");
const modal = document.getElementById("modal");
const optX = document.getElementById("btn-x");
const optO = document.getElementById("btn-o");
const resultMessage = document.getElementById("result-message"); // Añade un elemento para mostrar el resultado
let user = "";
let machine = "";
let boardGame = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;

optX.addEventListener("click", () => {
    user = "X";
    machine = "O";
    closeModal();
    playUser();
});

optO.addEventListener("click", () => {
    user = "O";
    machine = "X";
    closeModal();
    playUser();
});

function closeModal() {
    modal.style.display = "none";
}

function playUser() {
    board.forEach((cell, i) => {
        cell.addEventListener("click", handleUserClick.bind(null, i));
    });
}

function playMachine() {
    let optMachine
    do {
        optMachine = getRandomNumber() //Asigna un valor random a la variable optMachine
    } while (boardGame[optMachine] !== "" || isGameOver); //Repite el bucle hasta encontrar una casilla libre

    board[optMachine].textContent = machine; // Coloca la maquina en la casilla elegida
    boardGame[optMachine] = machine; // Actualiza el estado del juego en el tablero
    validateGame(); // Valida el estado del juego despues de que juegue la maquina
}

function handleUserClick(i) {
    if (!isGameOver && board[i].textContent === "") {
        board[i].textContent = user;
        boardGame[i] = user;
        validateGame();

        if (!isGameOver) {
            setTimeout(playMachine(), 1000)
        }
    }
}

function validateGame() {
    const winner = checkWinner();
    if (winner) {
        showResult(`${winner} gana!`) // Muestra el resultado al ganador
        isGameOver = true;
        board.forEach(cell => {
            cell.removeEventListener("click", handleUserClick);
        });
    } else if (!boardGame.includes("")) {
        showResult("Empate!") // Muestra el resultado en caso de empate
        isGameOver = true;
        board.forEach(cell => {
            cell.removeEventListener("click", handleUserClick);
        });
    } else {
        console.log("Pendiente")
    }
}

function checkWinner() {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardGame[a] === boardGame[b] &&
            boardGame[b] === boardGame[c] &&
            boardGame[a] !== "") {
            return boardGame[a];
        }
    }
    return null;
}

function showResult(message) {
    Swal.fire(message)
}

function getRandomNumber() {
    return Math.floor(Math.random() * 9);
}

