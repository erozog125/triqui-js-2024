const board = document.querySelectorAll('.cell')
let playUser = document.getElementById('selection')

board[0].addEventListener('click',chooseletter)
board[1].addEventListener('click',chooseboard1)
board[2].addEventListener('click',chooseboard2)
board[3].addEventListener('click',chooseboard3)
board[4].addEventListener('click',chooseboard4)
board[5].addEventListener('click',chooseboard5)
board[6].addEventListener('click',chooseboard6)
board[7].addEventListener('click',chooseboard7)
board[8].addEventListener('click',chooseboard8)


function chooseletter(){
    board[0].textContent = playUser.value
}
function chooseboard1(){
    board[1].textContent = playUser.value
}
function chooseboard2(){
    board[2].textContent = playUser.value
}
function chooseboard3(){
    board[3].textContent = playUser.value
}
function chooseboard4(){
    board[4].textContent = playUser.value
}
function chooseboard5(){
    board[5].textContent = playUser.value
}
function chooseboard6(){
    board[6].textContent = playUser.value
}
function chooseboard7(){
    board[7].textContent = playUser.value
}
function chooseboard8(){
    board[8].textContent = playUser.value
}