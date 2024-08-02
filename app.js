document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const cells = document.querySelectorAll(".cell");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modalMessage");
  const closeModalButton = document.getElementById("closeModal");
  const restartButton = document.getElementById("restart");
  const chooseXButton = document.getElementById("chooseX");
  const chooseOButton = document.getElementById("chooseO");
  const overlay = document.getElementById("overlay");
  const startGameButton = document.getElementById("startGame");

  const playerScoreElement = document.getElementById("playerScore");
  const aiScoreElement = document.getElementById("aiScore");

  let playerSymbol = "";
  let aiSymbol = "";
  let boardState = Array(9).fill(null);
  let currentPlayer = "player"; // Siempre inicia el jugador

  // Contadores de victorias
  let playerScore = 0;
  let aiScore = 0;

  function resetGame() {
    boardState.fill(null);
    cells.forEach((cell) => {
      cell.textContent = "";
      cell.style.pointerEvents = "auto";
      cell.classList.remove("winner-cell");
    });
    board.classList.remove("winner-line");
    currentPlayer = "player"; // El jugador siempre inicia
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
  }

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

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        highlightWinningCells([a, b, c]);
        return boardState[a];
      }
    }
    return boardState.includes(null) ? null : "tie";
  }

  function highlightWinningCells(indices) {
    indices.forEach((index) => {
      cells[index].classList.add("winner-cell");
    });
    board.classList.add("winner-line");
  }

  function updateScore(winner) {
    if (winner === playerSymbol) {
      playerScore++;
      playerScoreElement.textContent = playerScore;
    } else if (winner === aiSymbol) {
      aiScore++;
      aiScoreElement.textContent = aiScore;
    }
  }

  function aiMove() {
    let availableCells = boardState
      .map((value, index) => (value === null ? index : null))
      .filter((value) => value !== null);
    if (availableCells.length > 0) {
      let randomIndex =
        availableCells[Math.floor(Math.random() * availableCells.length)];
      boardState[randomIndex] = aiSymbol;
      cells[randomIndex].textContent = aiSymbol;
      cells[randomIndex].style.pointerEvents = "none";
      let winner = checkWinner();
      if (winner) {
        showModal(winner === "tie" ? "Empate" : `Ganador: ${winner}`);
        updateScore(winner);
        cells.forEach((cell) => (cell.style.pointerEvents = "none"));
      } else {
        currentPlayer = "player";
      }
    }
  }

  function handleCellClick(event) {
    if (currentPlayer === "player") {
      const cell = event.target;
      const index = cell.getAttribute("data-index");
      if (!boardState[index]) {
        boardState[index] = playerSymbol;
        cell.textContent = playerSymbol;
        cell.style.pointerEvents = "none";
        let winner = checkWinner();
        if (winner) {
          showModal(winner === "tie" ? "Empate" : `Ganador: ${winner}`);
          updateScore(winner);
          cells.forEach((cell) => (cell.style.pointerEvents = "none"));
        } else {
          currentPlayer = "ai";
          aiMove();
        }
      }
    }
  }

  function chooseSymbol(symbol) {
    playerSymbol = symbol;
    aiSymbol = symbol === "X" ? "O" : "X";
    chooseXButton.style.display = "none";
    chooseOButton.style.display = "none";
  }

  function startGame() {
    overlay.style.display = "none";
  }

  chooseXButton.addEventListener("click", () => chooseSymbol("X"));
  chooseOButton.addEventListener("click", () => chooseSymbol("O"));
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartButton.addEventListener("click", resetGame);
  startGameButton.addEventListener("click", startGame);

  closeModalButton.addEventListener("click", closeModal);
});
