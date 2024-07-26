const divsCeldas = document.querySelectorAll(".cell"); //nos traemos a todas las celdas del html

// variables para guardar la elección de la máquina
let rowChooseMachine = 0;
let columnChooseMachine = 0;

// creamos una matriz para guardar cada celda del html
const lockersList = [

    [divsCeldas[0],  divsCeldas[1],  divsCeldas[2]],

    [divsCeldas[3],  divsCeldas[4],  divsCeldas[5]],

    [divsCeldas[6],  divsCeldas[7],  divsCeldas[8]]

];
// creamos otra matriz para manejar los estados de cada celda
const statusLockers = [
    ["",  "",  ""],         // "" es vacio
                            // x  es usuario
    ["",  "",  ""],         // o  es máquina

    ["",  "",  ""]
];
            //       MATRIZ INDEXES:
            // [
            //     [0 0]  [0 1]  [0 2]

            //     [1 0]  [1 1]  [1 2]

            //     [2 0]  [2 1]  [2 2]
            // ]

            //para recorrer la matriz: 
            // for (let indexRow = 0; indexRow < lockersList.length; indexRow++) {
            //     for (let indexColumn = 0; indexColumn < lockersList[indexRow].length; indexColumn++) {
            //         const element = lockersList[indexRow][indexColumn];
            //         console.log(element.textContent);
            //     }
            // }


//Implementacion de flujo: 
handleClick();

//función que recorre la matriz, verifica que la celda esté vacia y crea el evento de click
function handleClick() {
    for (let indexRow = 0; indexRow < lockersList.length; indexRow++) {
        for (let indexColumn = 0; indexColumn < lockersList[indexRow].length; indexColumn++) {
            const element = lockersList[indexRow][indexColumn];
            if(isEmpty(lockersList, indexRow, indexColumn)) {
                element.addEventListener('click', ()=> {
                    element.textContent = 'X';
                    element.style.color = '#F54104'
                    statusLockers[indexRow][indexColumn] = 'x';
                    machineTurn();
                    verifyWinner();
                }); 
            }
            
        }
    }
}

//función que genera dos numeros aleatorios para la fila y la columna
function machineTurn () {
    do {
        rowChooseMachine = getRandomNumber(0, 2);
        columnChooseMachine = getRandomNumber(0, 2);
    } while (!isEmpty(lockersList, rowChooseMachine, columnChooseMachine) && !verifyFullTable());

    lockersList[rowChooseMachine][columnChooseMachine].textContent = 'O';
    lockersList[rowChooseMachine][columnChooseMachine].style.color = '#03F7A8';
    statusLockers[rowChooseMachine][columnChooseMachine] = 'o'
}

// función que verifica los posibles escenarios del juego
function verifyWinner() {
     //Verificar todas las posibles combinaciones ganadoras para el Usuario
    if ((statusLockers[0][0] === 'x' && statusLockers[0][1] === 'x' && statusLockers[0][2] === 'x') ||
        (statusLockers[1][0] === 'x' && statusLockers[1][1] === 'x' && statusLockers[1][2] === 'x') ||
        (statusLockers[2][0] === 'x' && statusLockers[2][1] === 'x' && statusLockers[2][2] === 'x') ||
        (statusLockers[0][0] === 'x' && statusLockers[1][0] === 'x' && statusLockers[2][0] === 'x') ||
        (statusLockers[0][1] === 'x' && statusLockers[1][1] === 'x' && statusLockers[2][1] === 'x') ||
        (statusLockers[0][2] === 'x' && statusLockers[1][2] === 'x' && statusLockers[2][2] === 'x') ||
        (statusLockers[0][0] === 'x' && statusLockers[1][1] === 'x' && statusLockers[2][2] === 'x') ||
        (statusLockers[0][2] === 'x' && statusLockers[1][1] === 'x' && statusLockers[2][0] === 'x')) {
        showWinner("¡Ganaste! 😄");
        return;
    }
     //Verificar todas las posibles combinaciones ganadoras para la Máquina
    if ((statusLockers[0][0] === 'o' && statusLockers[0][1] === 'o' && statusLockers[0][2] === 'o') ||
        (statusLockers[1][0] === 'o' && statusLockers[1][1] === 'o' && statusLockers[1][2] === 'o') ||
        (statusLockers[2][0] === 'o' && statusLockers[2][1] === 'o' && statusLockers[2][2] === 'o') ||
        (statusLockers[0][0] === 'o' && statusLockers[1][0] === 'o' && statusLockers[2][0] === 'o') ||
        (statusLockers[0][1] === 'o' && statusLockers[1][1] === 'o' && statusLockers[2][1] === 'o') ||
        (statusLockers[0][2] === 'o' && statusLockers[1][2] === 'o' && statusLockers[2][2] === 'o') ||
        (statusLockers[0][0] === 'o' && statusLockers[1][1] === 'o' && statusLockers[2][2] === 'o') ||
        (statusLockers[0][2] === 'o' && statusLockers[1][1] === 'o' && statusLockers[2][0] === 'o')) {
        showWinner("¡Perdiste! 😞");
        return;
    }
    if (verifyFullTable()) {
        showWinner("¡Es un empate! 🤜🏼🤛🏼");
    }
}

//función que retorna un numero aleatorio.
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// función que retorna true si la casilla se encuentra vacía
function isEmpty(matriz, rowIndex, columnIndex) {
    return matriz[rowIndex][columnIndex].textContent === ''? true : false;
}

// función que verifica que la tabla esté completamente llena
function verifyFullTable() {
    let counter = 0;
    statusLockers.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (!isEmpty(lockersList, rowIndex, columnIndex)) {
                counter++;
            }
        });
    });
    console.log(counter===9)
    return counter===9;
}

// función que envia una alerta personalizada
function showWinner(message) {
    Swal.fire({
        title: message,
        icon: '',
        confirmButtonText: 'Jugar de nuevo'
    }).then(() => {
        reloadGame();
    });
}

// función que resetea el juego
function reloadGame() {
    rowChooseMachine = 0;
    columnChooseMachine = 0;

    statusLockers.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            statusLockers[rowIndex][columnIndex] = "";
        });
    });

    divsCeldas.forEach((cell) => {
        cell.textContent = "";
    });  
}
