let isPlayerOne = true;
let cells = document.getElementsByClassName("cell");
let  gameActive = true;

for ( let i=0;  i< cells.length; i++) {
    cells[i].addEventListener('click', userMove);
}
function userMove(e) {
    let cellValue = e.target.innerHTML;
    if (!cellValue.length){
     e.target.innerHTML = isPlayerOne? 'x' : 'o';
     isPlayerOne = !isPlayerOne;
     checkWinner();
    }
}



 
function checkWinner() {
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],

    ];

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (cells[a].innerHTML !== '' &&
            cells[a].innerHTML === cells[b].innerHTML &&
            cells[a].innerHTML === cells[c].innerHTML) {
            alert('¡Ganador!');
            gameActive = false;
            return;
        }
    }
    
    if ([...cells].every(cell => cell.innerHTML!=="")) {
        alert("!Empate!");
        gameActive= false;

        }
    }

    function resetGame() {
        for (let i = 0; i < cells.length; i++) {
            cell[i].innerHTML = '';
        };
        isPlayerOne = true;
        gameActive  = true;
    }
        
        