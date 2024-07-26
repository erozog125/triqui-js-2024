/*const board = document.querySelectorAll('.cell')



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

/*eleccion ususario*/ 
const btnX = document.getElementById('btnX')
const btnY = document.getElementById('btnY')
let User = 0

btnX.addEventListener('click', () => {
    User = "X"
    both = "O"
    console.log(User);
})

btnY.addEventListener('click', () => {
    User = "O"
    both = "X"
    console.log(User);
})

/*tablero*/

board = document.querySelectorAll('.cell')

board[0].addEventListener('click',()=> {
    board[0].textContent = "" + User 
  })
board[1].addEventListener('click',()=> {
    board[1].textContent = "" + User 
  })
board[2].addEventListener('click',()=> {
    board[2].textContent = "" + User 
  })
board[3].addEventListener('click',()=> {
    board[3].textContent = "" + User 
  })
board[4].addEventListener('click',()=> {
    board[4].textContent = "" + User 
  })
board[5].addEventListener('click',()=> {
    board[5].textContent = "" + User 
  })
board[6].addEventListener('click',()=> {
    board[6].textContent = "" + User 
  })
board[7].addEventListener('click',()=> {
    board[7].textContent = "" + User 
  })
board[8].addEventListener('click',()=> {
    board[8].textContent = + User 
  })
/* validacion */

function validation(params) {
    
}