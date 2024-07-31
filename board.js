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

function showModal() {
  modal.style.display = 'flex'; // o 'block' según el diseño
}

function reload() {
  boardGame = ['', '', '', '', '', '', '', '', ''];
  isGameOver = false;
  user = '';
  machine = '';
  board.forEach(cell => {
      cell.textContent = ''; // Limpia el contenido de cada celda
  });
  showModal();
}

function showResult(message){
  swal.fire(message)

}

function getRandonNumber(){
  return Math.floor(Math.random() * 9)
}

function checkWinner(){
  const winingCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(const combination of winingCombination){
    const [a,b,c] = combination;
    if(boardGame[a] === boardGame[b] && 
      boardGame[b] === boardGame[c]  &&
      boardGame[a] != '' ){
        return boardGame[a]
      }
     }
     return null
}

function validateGame(){
  const winner = checkWinner()
  if(winner){
  showResult(`${winner} gana`)
  isGameOver = true
  board.forEach((cell) => {
    cell.removeEventListener('click', handleUserClick)
  })
  reload();
  
  }else if(!boardGame.includes('')){
    showResult('Empate')
    isGameOver = true
    board.forEach((cell) => {
      cell.removeEventListener('click', handleUserClick)
    })
    reload();
  }else{
  console.log('pendiente');
 }
}
function playMachine(){
  let optMachine
  do{
    optMachine = getRandonNumber()
  }while(boardGame[optMachine] !== '' || isGameOver)
    board[optMachine].textContent = machine;
    boardGame[optMachine] = machine;
    validateGame();
}

function handleUserClick(idx){
  if(!isGameOver && board[idx].textContent === ''){
    board[idx].textContent = user;
    boardGame[idx] = user;
    validateGame()
    if(!isGameOver){
      setTimeout(() => {
        playMachine()
      }, 1000);
    }
  }
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






  