

let myArray = []
let user = document.querySelectorAll('.user')
const board = document.querySelectorAll('.cell')
const o = document.getElementById("o")
const x = document.getElementById("x")

function vaidateUser(){
    if (user == x)
        return x

}

o.addEventListener('click',chooseo)
x.addEventListener('click',choosex)
// board[0].addEventListener('click',choose)

function choose(){
     board[0].textContent = "x"
}
function choosex(){
    board[0].textContent = "x"
}
function chooseo(){
    board[0].textContent = "o"
}

//console.log(board)

// ¿Cuántos elementos? dimensión, longitud del array

//let myArray = [1,2,3,4]

//myArray.length
//myArray.length-1
//myArray[4]

// Array.length

//console.log(board[0].textContent)
//console.log(board[1].textContent)
//console.log(board[2].textContent)
//console.log(board[3].textContent)
//console.log(board[4].textContent)
//console.log(board[5].textContent)
//console.log(board[6].textContent)
//console.log(board[7].textContent)
//console.log(board[8].textContent)

//board[0].addEventListener('click',()=> {
//  board[0].textContent = 'X'
//})

//board[0] === board[1] && board[1]  === board[2]

//board[0].textContent === ''

//Math.ceil(0.9)
//Math.floor(0.1)