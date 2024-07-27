//Definimos el tablero de juego como una matriz 3x3
const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
//Seleccionamos todas las celdas
const cells = document.querySelectorAll('.cell');
//Creamos el evento click a todas las celdas
cells.forEach(cell => {
    cell.addEventListener('click', onClickUser);
});
//hacemos la funcion para el event de hacer click coloque la letra X 
function onClickUser(event) {
    //asigna el elemento en el que ocurre el event de hacer click
    const cell = event.currentTarget;
    //Declaramos una constante que referencie las filas y las columnas
    //Utilizamos el cell.id.split('-') para traernos la celda por el id y dividirlas en secciones  ya que el id es cell-fila-columna lo divide en un arreglo de 3 partes ("cell","fila","columna")
    //Utilizamos .slice para eliminar la primera parte del arreglo, por ello damos un parametro de 1 para que el arreglo  empiece desde ese punto, es decir si el id dividido es ("cell","fila","columna"), el resultado sera ("fila","columna") asi sacando el argumento en la posicion 0 que sea "cell"
    //Utilizamos .map(numbe) para hacer la conversion de string a numero  de ese mismo arreglo que convertimos dando (fila , columna)
    const [row, col] = cell.id.split('-').slice(1).map(Number);
    //Funcion que valida que la celda este vacia para enviar el movimiento del usuario
    if(emptyPosition(row,col,'X',cell)){
        winner(); // Verifica si hay un ganador después del movimiento del usuario
        chooseCpu();
        winner(); // Verifica si hay un ganador después del movimiento de la CPU
    }
    
   
}
//Hacemos una funcion
function chooseCpu() {
    //Declamos un arreglo vacio para almacenar las coordenadas vacias del tablero
    let emptyCells = [];
    //Usamos un ciclo for para recorrer las filas del tablero
    for (let row = 0; row < 3; row++) {
        //Usamos un ciclo for de nuevo para ahora recorrer las columnas del tableo
        for (let col = 0; col < 3; col++) {
            //Realizamos una condicional paa validar si el tablero en la fila y columna esta vacia
            if (board[row][col] === '') {
                //Entonces agregamos las posiciones de fila y columna en el arreglo vacio que definimos anterior mente
                emptyCells.push({ row, col });
            }
        }
    }
    //Ahora  realizamos una condicional que verifique si nuestro arreglo esta vacio, en el caso de que que tenga contenido pase a la accion de la maquina
    if (emptyCells.length === 0) {
        // El arreglo no tiene posiciones
        return;
    }
    //Utilizamos la funcion Math.random para generar un numero aleatorio multiplicandola por el tamaño del arreglo para generar el rango en el cual el dara su numero
    //En ella misma utilizaremos el Math.floor para redondear hacia abajo al entero mas cercano
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    //Desestructuramos las variables row y col que obtendran los valores de las propiedades del objeto seleccionado en emptyCells
    let { row, col } = emptyCells[randomIndex];

    //Aqui actualizaremos el tablero en memoria ya con el movimiento del jugador el valor era X
    board[row][col] = 'O';
    //Ahora enviamos las posiciones en el id , donde la celda que coincida con los datos de la fila y columna envie la letra O
    document.getElementById(`cell-${row}-${col}`).textContent = 'O';
}

function emptyPosition(row, col, user, cellElement){
    //Realizamos nuestra primera condicion para validar si el tablero en la fila y columna en la que esta ubicada donde se realizo el evento esta igual a vacia ' ' entonces cambiamos ese vacio a X , y luego le mandamos esa X a la celda en el html siempre y cuando sea true , si es false no ingresa nada
    if (board[row][col] === '') {
        board[row][col] = user;
        cellElement.textContent = user;
        return true;
    }
    return false;
}

function winner() {
    // Verificar filas
    for (let row = 0; row < 3; row++) {
        if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            updateResult(board[row][0] + ' Gana');
            setTimeout(reload,800)
            return;
        }
    }

    // Verificar columnas
    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== '' && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            updateResult(board[0][col] + ' Gana!');
            setTimeout(reload,800)
            return;
        }
    }

    // Verificar diagonal principal
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
         updateResult(board[0][0] + ' Gana!');
         setTimeout(reload,800)
        return;
    }

    // Verificar diagonal secundaria
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        updateResult(board[0][2] + ' Gana!');
        setTimeout(reload,800)
        return;
    }

    //Condicional que nos indica si hay un empate 
    if (isDraw()) {
        updateResult('Es un Empate');
        setTimeout(reload,1000)
        return;
    }
}


function updateResult(message) {
    //Envia el mensaje segun el resultado
    const resultElement = document.querySelector('.result');
    resultElement.textContent = message;
}


function isDraw() {
    // Recorremos cada fila y columna del tablero
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            // Si encontramos una celda vacía, el juego no ha terminado
            if (board[row][col] === '') {
                return false;
            }
        }
    }
    // Si no encontramos celdas vacías, el juego ha terminado en empate
    return true;
}

function reload(){
    //Reinicia la pagina a su estado original del juego
    location.reload();
}
