
const board = document.querySelectorAll('.cell')
const modal = document.getElementById('modal')
const optX = document.getElementById('btn-x')
const optO = document.getElementById('btn-o')
const resultMessage = document.getElementById('result-message') // Añade un elemento para mostrar el resultado
let user = ''
let machine = ''
let boardGame = ['', '', '', '', '', '', '', '', '']
let isGameOver = false /*valor que contiene */

optX.addEventListener('click', () => {
    user = 'X'
    machine = 'O'
    closeModal()
    playUser()
})

optO.addEventListener('click', () => {
    user = 'O'
    machine = 'X'
    closeModal()
    playUser()
})

function closeModal() {
    modal.style.display = 'none'
}

function playUser() {
    board.forEach((cell, idx) => {
      cell.addEventListener('click', handleUserClick.bind(null, idx));
    });
  }

  function playMachine(){
    let optMachine
    do {
        optMachine = getRandomNumber()
    } while (boardGame[optMachine]!==""|| isGameOver);

    board[optMachine].textContent = machine;
    boardGame[optMachine] = machine;
    validateGame();
  }

  function handleUserClick(index) {
    console.log('Celda clickeada con índice:', index);
  }
  
  const cells = [/* Elementos del DOM */];
  cells.forEach((cell, idx) => {
    cell.addEventListener('click', handleUserClick.bind(null, idx));
  });
  
  
