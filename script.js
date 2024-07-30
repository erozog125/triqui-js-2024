const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
let turn = 'X'; // Empieza el jugador X
let boardState = ['', '', '', '', '', '', '', '', ''];

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }
    return boardState.includes('') ? null : 'T'; // 'T' para empate
}

function handleClick(event) {
    const index = event.target.dataset.index;

    if (boardState[index] || checkWinner()) return;

    boardState[index] = turn;
    event.target.textContent = turn;

    const winner = checkWinner();
    if (winner) {
        setTimeout(() => alert(winner === 'T' ? '¡Empate!' : `¡Ganó ${winner}`), 10);
        return; // Detener el juego si hay un ganador
    }

    turn = turn === 'X' ? 'O' : 'X'; // Cambiar turno
}

cells.forEach(cell => cell.addEventListener('click', handleClick));