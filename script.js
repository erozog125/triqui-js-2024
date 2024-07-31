const board = document.querySelectorAll(".cell");
const modal = document.getElementById("modal");
const optX = document.getElementById("btn-x");
const optO = document.getElementById("btn-o");
const resultMessage = document.getElementById("result-message"); // AÃ±ade un elemento para mostrar el resultado
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
        optMachine = getRandomNumber()
    } while (boardGame[optMachine] !== "" || isGameOver); //Repite el bucle hasta encontrar una casilla libre

    board[optMachine].textContent = machine; // Coloca la maquina en la casilla elegida
    boardGame[optMachine] = machine; // Actualiza el estado del juego en el tablero
    validateGame(); // Valida el estado del juego despues de que juegue la maquina
}

