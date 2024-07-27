
    // Selecciona todas las celdas del tablero
    const board = document.querySelectorAll('.cell');
    let playerSymbol = ''; // Símbolo del jugador
    let computerSymbol = ''; // Símbolo de la computadora
    let currentPlayer = ''; // Jugador actual

    // Solicita al jugador que elija su símbolo
    function selectSymbol() {
        playerSymbol = prompt("Elige tu símbolo: X u O").toUpperCase();
        if (playerSymbol !== 'X' && playerSymbol !== 'O') {
            playerSymbol = 'X'; // Valor predeterminado si la entrada no es válida
        }
        computerSymbol = (playerSymbol === 'X') ? 'O' : 'X';
        currentPlayer = playerSymbol;
    }

    // Inicializa el juego
    selectSymbol();

    // Maneja el movimiento del jugador
    function playerMove(event) {
        const cell = event.target;
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                setTimeout(function() {
                    alert(currentPlayer + ' ha ganado!');
                }, 10);
                return;
            }
            if (isDraw()) {
                setTimeout(function() {
                    alert('¡Es un empate!');
                }, 10);
                return;
            }
            currentPlayer = computerSymbol;
            computerMove();
        }
    }

    // Maneja el movimiento de la computadora
    function computerMove() {
        const availableCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i].textContent === '') {
                availableCells.push(board[i]);
            }
        }
        if (availableCells.length === 0) return;
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const cell = availableCells[randomIndex];
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            setTimeout(function() {
                alert(currentPlayer + ' ha ganado!');
            }, 10);
            return;
        }
        if (isDraw()) {
            setTimeout(function() {
                alert('¡Es un empate!');
            }, 10);
            return;
        }
        currentPlayer = playerSymbol;
    }

    // Comprueba si hay un ganador
    function checkWin(symbol) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (let i = 0; i < winningCombinations.length; i++) {
            const combo = winningCombinations[i];
            if (board[combo[0]].textContent === symbol &&
                board[combo[1]].textContent === symbol &&
                board[combo[2]].textContent === symbol) {
                return true;
            }
        }
        return false;
    }

    // Comprueba si hay un empate
    function isDraw() {
        for (let i = 0; i < board.length; i++) {
            if (board[i].textContent === '') {
                return false;
            }
        }
        return true;
    }

    // Añadir evento de clic a cada celda
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', playerMove);
    }

    // Busca el botón de reinicio en el HTML
    const resetButton = document.getElementById('reset');

    // Maneja el reinicio del juego
    function resetGame() {
        for (let i = 0; i < board.length; i++) {
            board[i].textContent = '';
        }
        selectSymbol();
    }

    // Añadir evento de clic al botón de reinicio
    resetButton.addEventListener('click', resetGame);

