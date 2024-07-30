const selectCells = document.querySelectorAll('.cell');

const restartBtn = document.getElementById('restart');
const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let count = 0;
const disableCells = () => {
    selectCells.forEach((element) => {
        element.style.pointerEvents = 'none'; 
    });
};
const enableCells = () => {
    selectCells.forEach((element) => {
        element.style.pointerEvents = 'auto';
        element.innerText = '';
    });
    count = 0;
};
selectCells.forEach((cell, i) => {
    cell.addEventListener('click', (e) => chooseUsers(e, i));
});
function chooseUsers(e) {
    const cell = e.target;
    if (cell.innerText !== "") return; 

    count++;
    const letter = count % 2 ? 'X' : 'O'; 
    cell.innerText = letter;
    winChecker(); 
}

function winChecker() {
    for (let pattern of winningPattern) {
        let [cell1, cell2, cell3] = [
            selectCells[pattern[0]].innerText,
            selectCells[pattern[1]].innerText,
            selectCells[pattern[2]].innerText,
        ];

        if (cell1 !== "" && cell1 === cell2 && cell2 === cell3) {
            console.log(`Gano ${cell1}`);
            disableCells(); 
            return; 
        }
    }

    if (count === 9) {
        console.log('Empate');
        disableCells();
    }
}

restartBtn.addEventListener('click', () => {
    enableCells(); 
});