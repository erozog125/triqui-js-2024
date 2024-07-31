// definimos constantes, nunca cambian
const board = document.querySelectorAll('.cell')
const modal = document.getElementById('modal')
const optX = document.getElementById('btn-x')
const optO = document.getElementById('btn-o')
const resultMessage = document.getElementById('result-message') // Añade un elemento para mostrar el resultado

// estas ya son la varibles si pueden cambiar
let user = ''
let machine = ''
let boardGame = ['', '', '', '', '', '', '', '', '']
let isGameOver = false

// bloquear selección después de empezar
function closeModal(){ 
    modal.style.display = 'none'
}

// evento de selección
optX.addEventListener('click', ()=> { 
    user='X'
    machine='O'
    closeModal()
    playerUser()
})

optO.addEventListener('click', ()=> { // boton de seleccion de O del jugador
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