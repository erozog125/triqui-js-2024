const divsCeldas = document.querySelectorAll(".cell");

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

for (let indexRow = 0; indexRow < lockersList.length; indexRow++) {
    for (let indexColumn = 0; indexColumn < lockersList[indexRow].length; indexColumn++) {
        const element = lockersList[indexRow][indexColumn];
        element.addEventListener('click', ()=> {
            if(isEmpty(lockersList, indexRow, indexColumn)) {
                element.textContent = 'X';
            }
        });
    }
}

function isEmpty(matriz, rowIndex, columnIndex) {
    return matriz[rowIndex][columnIndex].textContent === ''? true : false;
}

