// definimos constantes, nunca cambian
const board = document.querySelectorAll('.cell')
const modal = document.getElementById('modal')
const optX = document.getElementById('btn-x')
const optO = document.getElementById('btn-o')
const resultMessage = document.getElementById('result-message')
const reset = document.getElementById('reset') 

// estas ya son la varibles si pueden cambiar
let user = ''
let machine = ''
let boardGame = ['', '', '', '', '', '', '', '', '']
let isGameOver = false

// bloquear selección después de empezar
function closeModal(){ 
    modal.style.display = 'none'
}

// un evento que puede selecciones
optX.addEventListener('click', ()=> { 
    user='X'
    machine='O'
    closeModal()
    playerUser()
})

// un evento que puede selecciones
optO.addEventListener('click', ()=> { 
    user='O'
    machine='X'
    closeModal()
    playerUser()
})

function playerUser(){ //metodo para que acepte el clik y coloque en la celda el simbolo seleccionado
    board.forEach((cell, idx)=> { // recorre el comando por cada celda y obtiene el indice
        cell.addEventListener('click',handleUserClick.bind(null, idx));
    });
}

function playMachine(){
    let opMachine
    do{
        opMachine = getRandomNumber()
    } while (boardGame[opMachine] !== '' || isGameOver)

        board[opMachine].textContent = machine
        boardGame[opMachine] = machine
        validateGame()
}

function getRandomNumber(){
    return Math.floor(Math.random() * 9)
}


// define que la cpu debe esperar 1 sg antes de jugar
function handleUserClick(idx){
    if(!isGameOver && board[idx].textContent === ''){
        board[idx].textContent = user
        boardGame[idx] = user
        validateGame()
        if(!isGameOver){
            setTimeout(()=>{ 
                playMachine()
            }, 1000)
        }
    }
}

function checkWinner(){
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
    for(const combination of winningCombinations){
        const [a,b,c] = combination
        if (boardGame[a] === boardGame[b] &&
            boardGame[b] === boardGame[c] &&
            boardGame[a] != ''){
            return boardGame[a]
        }
    }
    return null
}

function validateGame(){
    const winner = checkWinner()
    if(winner) {
        showResult(`${winner} gana!`)
        isGameOver = true
        board.forEach((cell)=>{
            cell.removeEventListener('click', handleUserClick)
        })
    }else if(!boardGame.includes('')){
        showResult('Empate!')
        isGameOver = true
        board.forEach((cell)=>{
            cell.removeEventListener('click', handleUserClick)
        })
    }else{
        console.log('pendiente')
    }
}

function showResult(message){
    Swal.fire(message)
}

function resetGame() {
    // Restablecer el estado del juego
    boardGame = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    user = '';
    machine = '';
    
    // Limpiar el tablero visualmente
    board.forEach(cell => {
    cell.textContent = '';
    });

    // Mostrar el modal para seleccionar X o O
    modal.style.display = 'flex';
}

reset.addEventListener('click', resetGame);


/*
reset.addEventListener('click', ()=> { 
    board.forEach(cell => cell.classList.remove('x', 'o'));
})

/* apuntes Triqui:
const board = document.querySelectorAll('.cell')

console.log(board)

// ¿Cuántos elementos? dimensión, longitud del array

let myArray = [1,2,3,4]

myArray.length
myArray.length-1
myArray[4]

// Array.length

console.log(board[0].textContent)
console.log(board[1].textContent)
console.log(board[2].textContent)
console.log(board[3].textContent)
console.log(board[4].textContent)
console.log(board[5].textContent)
console.log(board[6].textContent)
console.log(board[7].textContent)
console.log(board[8].textContent)

board[0].addEventListener('click',()=> {
board[0].textContent = 'X'
})

board[0] === board[1] && board[1]  === board[2]

board[0].textContent === ''

Math.ceil(0.9)
Math.floor(0.1)*/