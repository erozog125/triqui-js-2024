/* const one = document.getElementById ('one');
const two = document.getElementById ('two');
const three = document.getElementById ('three');
const four = document.getElementById ('four');
const five = document.getElementById ('five');
const six = document.getElementById ('six');
const seven = document.getElementById ('seven');
const eight = document.getElementById ('eight');
const nine = document.getElementById ('nine');

*/



document.addEventListener('DOMContentLoaded', function() {
  const boardDiv = document.getElementById('boardDiv');
  const chooseDiv = document.getElementById('chooseDiv');
  const charactersContainer = document.getElementById('characters');
  let currentPlayer = '';
  let board = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;
  const resetButton = document.getElementById('resetButton');

  charactersContainer.addEventListener('click', function(event) {
      if (event.target.classList.contains('selection')) {
          currentPlayer = event.target.id === 'equis' ? 'X' : 'O';
          boardDiv.style.display = 'grid';
          chooseDiv.style.display = 'none';
          resetButton.style.display = 'block';
      }
  });

  boardDiv.addEventListener('click', function(event) {
    if (event.target.classList.contains('cell') && gameActive) {
        // Encuentra el índice de la celda clickeada
        let cellIndex = 0;
        let cells = boardDiv.children;
        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === event.target) {
                cellIndex = i;
                break;
            }
        }

        if (board[cellIndex] === '') {
            board[cellIndex] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                alert(currentPlayer + ' ha ganado!');
                gameActive = false;
            } else {
                let isDraw = true;
                for (let i = 0; i < board.length; i++) {
                    if (board[i] === '') {
                        isDraw = false;
                        break;
                    }
                }
                if (isDraw) {
                    alert('Es un empate!');
                    gameActive = false;
                } else {
                    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                }
            }
        }
    }
});

resetButton.addEventListener('click', function() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X'; 
    let cells = boardDiv.children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
    }

    boardDiv.style.display = 'none';
    chooseDiv.style.display = 'block';
    resetButton.style.display = 'none';
});

  function checkWin(player) {

      // Filas
      for (let row = 0; row < 3; row++) {
          if (board[row * 3] === player && board[row * 3 + 1] === player && board[row * 3 + 2] === player) {
              return true;
          }
      }
      // Columna 
      for (let col = 0; col < 3; col++) {
          if (board[col] === player && board[col + 3] === player && board[col + 6] === player) {
              return true;
          }
      }
      // Diagonales 
      if (board[0] === player && board[4] === player && board[8] === player) {
          return true;
      }
      if (board[2] === player && board[4] === player && board[6] === player) {
          return true;
      }
      return false;
  }
});
