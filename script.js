const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const scoreDisplay1= document.getElementById("score1");
const scoreDisplay2= document.getElementById("score2");
let turn = 'X'; // Empieza el jugador X
let boardState = ['', '', '', '', '', '', '', '', ''];
let score1=0;
let score2=0;

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
        if(winner ==="X"){
            score1++;
            alert("Jugador 1 gana!")
        }else if(winner ==="O"){
            score2++;
            alert("Jugador 2 gana!")
        }else{
            alert("Empate!")
        }
        updateScores();
        return;
    }

    turn = turn === 'X' ? 'O' : 'X'; // Cambiar turno
}
function resetGame(){

    cells.forEach(cell => cell.textContent ="");
    currentPlayer ="X";
}
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener("click", resetGame);


function updateScores(){
  scoreDisplay1.textContent =score1;
  scoreDisplay2.textContent =score2;
}
