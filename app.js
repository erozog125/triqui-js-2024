const player = 'X'
const cpu = 'O'
let currentPlayer
let board = ['', '', '', '', '', '', '', '', '']
let gameActive = false
let playerScore = 0
let cpuScore = 0
let countPlayer = 0
let countCpu = 0
let playerSymbol = ''
let cpuSymbol = ''

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cells = document.querySelectorAll('.cell')
const statusDisplay = document.getElementById('status')
const playerScoreDisplay = document.getElementById('playerScore')
const cpuScoreDisplay = document.getElementById('cpuScore')
const restartButton = document.getElementById('restart')
const tossCoinButton = document.getElementById('tossCoin')
const coinResultDisplay = document.getElementById('coinResult')
const chooseXButton = document.getElementById('chooseX')
const chooseOButton = document.getElementById('chooseO')
const symbolChoiceDiv = document.getElementById('symbolChoice')

chooseXButton.addEventListener('click', () => chooseSymbol('X'))
chooseOButton.addEventListener('click', () => chooseSymbol('O'))
tossCoinButton.addEventListener('click', tossCoin)
restartButton.addEventListener('click', restartGame)
cells.forEach(cell => cell.addEventListener('click', handleCellClick))

function chooseSymbol(symbol) {
    playerSymbol = symbol
    cpuSymbol = symbol === 'X' ? 'O' : 'X'
    currentPlayer = playerSymbol
    symbolChoiceDiv.style.display = 'none'
    statusDisplay.textContent = `Has elegido jugar con ${playerSymbol}. Presiona "Lanzar moneda" para empezar.`
}

function tossCoin() {
    if (!playerSymbol) {
        alert('Debes elegir un símbolo antes de comenzar.')
        return
    }

    board = ['', '', '', '', '', '', '', '', '']
    cells.forEach(cell => cell.textContent = '')
    const result = Math.random() < 0.5 ? 'Cara' : 'Sello'
    currentPlayer = result === 'Cara' ? playerSymbol : cpuSymbol
    coinResultDisplay.textContent = `Lanzamiento: ${result}. ${currentPlayer === playerSymbol ? 'Jugador' : 'CPU'} comienza.`
    gameActive = true
    if (currentPlayer === cpuSymbol) {
        cpuPlay()
    }
}

function handleCellClick(event) {
    const clickedCell = event.target
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell)

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return
    }

    board[clickedCellIndex] = currentPlayer
    clickedCell.textContent = currentPlayer
    validateResult()
}

function validateResult() {
    let roundWon = false
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i]
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true
            break
        }
    }

    if (roundWon) {
        if (currentPlayer === playerSymbol) {
            countPlayer++
            playerScoreDisplay.textContent = countPlayer
            statusDisplay.textContent = 'Usuario gana esta ronda'
        } else {
            countCpu++
            cpuScoreDisplay.textContent = countCpu
            statusDisplay.textContent = 'Máquina gana esta ronda'
        }
        checkWinner();
        gameActive = false
    } else if (!board.includes('')) {
        statusDisplay.textContent = 'Es un empate'
        gameActive = false
    } else {
        currentPlayer = currentPlayer === playerSymbol ? cpuSymbol : playerSymbol
        if (currentPlayer === cpuSymbol) {
            cpuPlay()
        }
    }
}

function checkWinner() {
    if (countCpu === 3) {
        alert('La máquina es la ganadora')
        resetScores()
    } else if (countPlayer === 3) {
        alert('El usuario es el ganador')
        resetScores()
    }
}

function resetScores() {
    countPlayer = 0
    countCpu = 0
    playerScoreDisplay.textContent = countPlayer
    cpuScoreDisplay.textContent = countCpu
    restartGame()
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', '']
    gameActive = true
    currentPlayer = playerSymbol
    cells.forEach(cell => cell.textContent = '')
    statusDisplay.textContent = 'Juego en curso!'
    symbolChoiceDiv.style.display = 'block'
    playerSymbol = ''
    cpuSymbol = ''
}

function cpuPlay() {
    let availableCells = []
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            availableCells.push(i)
        }
    }

    if (availableCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableCells.length)
        const cellIndex = availableCells[randomIndex]
        board[cellIndex] = cpuSymbol
        cells[cellIndex].textContent = cpuSymbol
        validateResult()
    }
}

