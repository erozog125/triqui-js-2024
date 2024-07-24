const divsCeldas = document.querySelectorAll(".cell");

let rowChooseMachine = 0;
let columnChooseMachine = 0;

const lockersList = [

    [divsCeldas[0],  divsCeldas[1],  divsCeldas[2]],

    [divsCeldas[3],  divsCeldas[4],  divsCeldas[5]],

    [divsCeldas[6],  divsCeldas[7],  divsCeldas[8]]

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
            element.addEventListener('click', ()=> {
                if(isEmpty(lockersList, indexRow, indexColumn)) {
                    element.textContent = 'X';
                }
                machineTurn();
                verifyWinner();//IMPLEMENTAR
            });
        }
    }
}

function machineTurn () {
    do {
        rowChooseMachine = getRandomNumber(0, 2);
        columnChooseMachine = getRandomNumber(0, 2);
    } while (!isEmpty(lockersList, rowChooseMachine, columnChooseMachine));

    lockersList[rowChooseMachine][columnChooseMachine].textContent = 'O';
}

function verifyWinner() {

}

//funcion que retorna un numero aleatorio.
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function isEmpty(matriz, rowIndex, columnIndex) {
    return matriz[rowIndex][columnIndex].textContent === ''? true : false;
}

