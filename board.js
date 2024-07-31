const board = document.querySelectorAll('.cell')
const modal = document.getElementById('modal')
const optX = document.getElementById('btn-x')
const optO = document.getElementById('btn-o')
const resultMessage = document.getElementById('result-message') // Añade un elemento para mostrar el resultado
let user = ''
let machine = ''
let boardGame = ['', '', '', '', '', '', '', '', '']
let isGameOver = false


function userOption(option){
  user = option;
  machine = option === 'X' ? 'O' : 'X';
  modal.style.display = 'none';  
  console.log(option);
  console.log(machine);
}

function playUser() {
  board.forEach((cell, idx) => {
    cell.addEventListener('click', handleUserClick.bind(null, idx));
  });
}

optX.addEventListener('click', () => {
  userOption('X')
  playUser()
});
optO.addEventListener('click', () =>  {
  userOption('O')
  playUser()
});






  