const board = document.querySelectorAll('.cell')
const modal = document.getElementById('modal')
const optX = document.getElementById('btn-x')
const optO = document.getElementById('btn-o')
const resultMessage = document.getElementById('result-message') // Añade un elemento para mostrar el resultado
let user = ''
let machine = ''
let boardGame = ['', '', '', '', '', '', '', '', '']
let isGameOver = false

let userPoints = 0
let machinePoints = 0

function closeModal(){ //metodo cierra la ventana al seleccionar X o O
    modal.style.display = 'none'
}

optX.addEventListener('click', ()=> { // boton de seleccion de X del jugador
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
        opMachine = getRandomNumber()
    } while (boardGame[opMachine] !== '' || isGameOver)

        board[opMachine].textContent = machine
        boardGame[opMachine] = machine
        validateGame()
}

function handleUserClick(idx){
    if(!isGameOver && board[idx].textContent === ''){
        board[idx].textContent = user
        boardGame[idx] = user
        validateGame()
        if(!isGameOver){
            setTimeout(()=>{ //el settimeout espera un 1 segundo para que la maquina juegue
                playMachine()
            }, 1000)
        }
    }
}

function validateGame(){
    const winner = checkWinner()
    if(winner) {
        points()
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

function points(){
    const point = checkWinner()
    if (user == point) {
        userPoints++
        console.log("usuario: "+userPoints)
        userPoint.textContent = "Puntos usuario: "+userPoints
    } else {
        machinePoints++
        console.log("maquina: "+machinePoints)
        machinePoint.textContent = "Puntos maquina: "+machinePoints
    }
}

function showResult(message){
    Swal.fire(message)
}

function getRandomNumber(){
    return Math.floor(Math.random() * 9)
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

