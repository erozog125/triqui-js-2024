const divsCeldas = document.querySelectorAll(".cell");

let rowChooseMachine = 0;
let columnChooseMachine = 0;

const lockersList = [

    [divsCeldas[0],  divsCeldas[1],  divsCeldas[2]],

    [divsCeldas[3],  divsCeldas[4],  divsCeldas[5]],

    [divsCeldas[6],  divsCeldas[7],  divsCeldas[8]]

];

const statusLockers = [
    ["",  "",  ""],

    ["",  "",  ""],

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

function machineTurn () {
    do {
        rowChooseMachine = getRandomNumber(0, 2);
        columnChooseMachine = getRandomNumber(0, 2);
    } while (!isEmpty(lockersList, rowChooseMachine, columnChooseMachine) && !verifyFullTable());

    lockersList[rowChooseMachine][columnChooseMachine].textContent = 'O';
    lockersList[rowChooseMachine][columnChooseMachine].style.color = '#03F7A8';
    statusLockers[rowChooseMachine][columnChooseMachine] = 'o'
}

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
}

//funcion que retorna un numero aleatorio.
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function isEmpty(matriz, rowIndex, columnIndex) {
    return matriz[rowIndex][columnIndex].textContent === ''? true : false;
}

function showWinner(message) {
    Swal.fire({
        title: message,
        icon: '',
        confirmButtonText: 'Jugar de nuevo'
    }).then(() => {
        reloadGame();
    });
}

function verifyFullTable() {
    let counter = 0;
    statusLockers.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
            if (!isEmpty(lockersList, rowIndex, columnIndex)) {
                counter++;
            }
        });
    });
    return counter===9;
}
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