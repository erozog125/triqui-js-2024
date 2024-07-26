const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
  });

function handleClick(index) {
    if (cells[index].innerHTML === '') {
        cells[index].innerHTML = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameActive && currentPlayer === 'O') {
            simulateMachineMove();
          }
    }
}

function simulateMachineMove() {
    let emptyCells = [];
    cells.forEach((cell, index) => {
      if (cell.innerText === '') {
        emptyCells.push(index);
      }
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const machineMove = emptyCells[randomIndex];
    cells[machineMove].innerText = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
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

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (cells[a].innerHTML !== '' &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML) {
            resetGame();
            return;
        }
    }

    if ([...cells].every(cell => cell.innerHTML !== '')) {
        alert('¡Empate!');
        resetGame();
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    currentPlayer = 'X';
}