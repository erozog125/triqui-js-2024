let isCircleTurn = false // Comienza el juego el jugador 1
const cells = document.querySelectorAll('.cell')
const board = document.querySelector('.board')
const winningMessageTextElement = document.getElementById('winning')
const messageContainer = document.getElementById('message-container')
const restartButton = document.getElementById('restartButton')

// Aca se crean las combinaciones para ganar ganadoras
const winCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Aqui empieza las función para iniciar el juego
function startGame() {
    isCircleTurn = false // Reiniciar el turno
    cells.forEach(cell => {
        cell.textContent = '' // Limpiar el toda la celdas
        cell.removeEventListener('click', handleClick)// Limpiar los event listeners
        cell.addEventListener('click', handleClick, { once: true }) // Agregar event listener
    });
    setBoardHoverClass() // Actualizar el efecto hover
    messageContainer.style.display = 'none' // Ocultar el mensaje al comienzo
}

// Manejar los click de cada una de la celdas(O y X)
function handleClick(e) {
    const cell = e.target
    const currentClass = isCircleTurn ? 'O' : 'X'

    // Poner los signos (O/X)
    placeMark(cell, currentClass)

    // Verificar si alguien ha ganado
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        // Verificar si hay empate
        endGame(true)
    } else {
        // Cambiar de turno
        swapTurns()
        setBoardHoverClass() // Actualizar el efecto hover
    }
}

// Colocar Los signos correspondiente a cada celda
function placeMark(cell, currentClass) {
    cell.textContent = currentClass
}

// Cambiar de turno
function swapTurns() {
    isCircleTurn = !isCircleTurn
}

// Establecer el efecto de hover según el turno
function setBoardHoverClass() {
    board.classList.remove('x')
    board.classList.remove('o')
    if (isCircleTurn) {
        board.classList.add('o')
    } else {
        board.classList.add('x')
    }
}

// Verificar si hay un ganado
function checkWin(currentClass) {
    return winCombination.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentClass
        });
    });
}

// Verificar si hay empate
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O'
    });
}

// Terminar el juego y mostrar el mensaje
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = '¡Es un empate!'
    } else {
        winningMessageTextElement.textContent = `¡${isCircleTurn ? "Segundo" : "Primer"} jugador ha ganado!`
    }
    messageContainer.style.display = 'block' // Mostrar el mensaje
}

// Ver el click en el botón de reinicio
restartButton.addEventListener('click', startGame)

// Inicio del juego
startGame()