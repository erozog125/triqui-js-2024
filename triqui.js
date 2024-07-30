// Inicializar variables
let currentPlayer = null;
let board = Array(9).fill(null); 
let isGameActive = true;

// Elementos del DOM
const cells = document.querySelectorAll(".cell");
const result = document.getElementById("result");
const reset = document.getElementById("reset");
const chooseXButton = document.getElementById("choose-x");
const chooseOButton = document.getElementById("choose-o");

// Función para elegir símbolo
function chooseSymbol(symbol) {
  if (currentPlayer) return;
  currentPlayer = symbol;
  const aiSymbol = symbol === "x" ? "o" : "x";
  result.textContent = "";
  chooseOButton.disabled = true;
  chooseXButton.disabled = true;
  
  if (currentPlayer === "x") {
    setTimeout(makeAIMove, 1000);
  }
}

// Función para manejar clic en la celda
function handleClick(event) {
  if (!currentPlayer || !isGameActive || currentPlayer === "o") {
    return;
  }
  const cell = event.target;
  const index = parseInt(cell.getAttribute("data-index"));
  if (board[index] || checkWinner()) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Verifica el resultado del juego
  if (checkWinner()) {
    result.textContent = `El jugador ${currentPlayer} ganó`;
    isGameActive = false;
  } else if (board.every(cell => cell !== null)) {
    result.textContent = "Empate";
    isGameActive = false;
  } else {
    // Cambia el turno a la máquina
    currentPlayer = "o";
    setTimeout(makeAIMove, 1000);
  }
}

// Función para verificar si hay un ganador
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) => {
    const [a, b, c] = pattern;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

// Función para los movimientos de la máquina
function makeAIMove() {
  if (!isGameActive || currentPlayer !== "o") return;

  const availableMoves = board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);

  if (availableMoves.length === 0) return; // No hay movimientos disponibles

  const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  board[randomIndex] = "o";
  cells[randomIndex].textContent = "o";

  // Verifica el resultado del juego despues del movimiento de la maquina
  if (checkWinner()) {
    result.textContent = "¡La máquina gano!";
    isGameActive = false;
  } else if (board.every((cell) => cell !== null)) {
    result.textContent = "¡Es un empate!";
    isGameActive = false;
  } else {
    // Cambia el turno al jugador despuss del movimiento de la maquina
    currentPlayer = "x";
  }
}

// Funcion para reiniciar el juego
function resetGame() {
  board.fill(null);
  cells.forEach((cell) => (cell.textContent = ""));
  result.textContent = "";
  currentPlayer = null;
  isGameActive = true;
  chooseOButton.disabled = false;
  chooseXButton.disabled = false;
}

// Agregar eventos a las celdas y botones
cells.forEach((cell) => cell.addEventListener("click", handleClick));
reset.addEventListener("click", resetGame);
chooseXButton.addEventListener("click", () => chooseSymbol("x"));
chooseOButton.addEventListener("click", () => chooseSymbol("o"));
