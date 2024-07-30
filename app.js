// Selecciona todas las celdas del tablero
const selectCells = document.querySelectorAll('.cell');
// Selecciona el botón de reinicio
const restartBtn = document.getElementById('restart');

// Define los patrones de victoria
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

// Inicializa el contador de movimientos
let count = 0;

// Desactiva todas las celdas
const disableCells = () => {
    selectCells.forEach((element) => {
        element.style.pointerEvents = 'none'; // Desactiva clics en la celda
    });
};

// Reactiva todas las celdas y las limpia
const enableCells = () => {
    selectCells.forEach((element) => {
        element.style.pointerEvents = 'auto'; // Reactiva clics en la celda
        element.innerText = '';
    });
    count = 0;
};

// Añade un evento de clic a cada celda
selectCells.forEach((cell, i) => {
    cell.addEventListener('click', (e) => chooseUsers(e, i));
});

// Función que maneja la selección de una celda por el usuario
function chooseUsers(e) {
    const cell = e.target;
    if (cell.innerText !== "") return; // Evita seleccionar una celda ocupada

    count++;
    const letter = count % 2 ? 'X' : 'O'; // Alterna entre 'X' y 'O'
    cell.innerText = letter;
    winChecker(); // Comprueba si hay un ganador
}

// Función que verifica si hay un ganador
function winChecker() {
    for (let pattern of winningPattern) {
        let [cell1, cell2, cell3] = [
            selectCells[pattern[0]].innerText,
            selectCells[pattern[1]].innerText,
            selectCells[pattern[2]].innerText,
        ];

        if (cell1 !== "" && cell1 === cell2 && cell2 === cell3) {
            console.log(`Gano ${cell1}`); // Anuncia el ganador
            disableCells(); // Desactiva las celdas
            return; // Termina la función después de encontrar un ganador
        }
    }

    // Detecta empate si se han hecho 9 movimientos sin ganador
    if (count === 9) {
        console.log('Empate');
        disableCells();
    }
}

// Añade un evento de clic al botón de reinicio
restartBtn.addEventListener('click', () => {
    enableCells(); // Reactiva y limpia las celdas
});
