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
let btnX = document.getElementById('btnX')
let btnY = document.getElementById('btnY')

btnX.addEventListener('click', () => {
    btnX = "X"
    console.log(btnX);
})

btnY.addEventListener('click', () => {
    btnY = "Y"
    console.log(btnY);


})