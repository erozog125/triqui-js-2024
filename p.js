const btnX = document.getElementById('btnX')
const btnY = document.getElementById('btnY')
let User = 0
let gameStarted = false
let boardGame = ["","","","","","","","",""]

function disableButtons() {
    btnX.disabled = true
    btnY.disabled = true
}

function enableButtons() {
    btnX.disabled = false
    btnY.disabled = false
}

btnX.addEventListener('click', () => {
    if (!gameStarted) {
        User = "X"
        both = "O"
        console.log(User)
        disableButtons()
        gameStarted = true
    }
})

btnY.addEventListener('click', () => {
    if (!gameStarted) {
        User = "O"
        both = "X"
        console.log(User)
        disableButtons()
        gameStarted = true
    }
})

/*tablero*/

const board = document.querySelectorAll('.cell')

board.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameStarted && cell.textContent === "") {
            cell.textContent = User

        }
    })
})

/* validacion */

function validation() {

}

function resetGame() {
    User = 0
    gameStarted = false
    enableButtons()
    board.forEach(cell => {
        cell.textContent = ""
    })
}


/*juega maquina */

const getRandomNumber =  (min, max)  => Math.round(Math.random() * (max - min) + min)

function getRandomNumber() {
    return Math.floor(Math.random() * 9)
}


function playMachine() {

    let turnMachine
    do {
        turnMachine = getRa
    } while (board[turnMachine] !== "" || gameOver);

    board[turnMachine].textContent = both;
    board[turnMachine] = both
    gameOver()
    
}



/* Reiniciar juego */
resetButton = document.getElementById('resetGame')
resetButton.addEventListener('click', resetGame)
