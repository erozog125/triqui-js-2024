//Selecciona todas las celdas del tablero
const cells= document.querySelectorAll("cell")

//Inicia el turno de los jugadores empezando por x
let isXturn = false

//Define las combinaciones ganadoras
const winningCombinations =[
    [0,1,2]
    [3,4,5]
    [6,7,8]
    [0,3,6]
    [1,4,7]
    [2,5,8]
    [0,4,8]
    [2,4,6]
]

//Código para que maneje el click en una celda
const handleclick =(e)=>{
    const  cell =e.target



//Si la celda está vacia, colocará una marca
    if (cell.textcontent===""){
        //Linea de codigo en el que se colocará la x o el o dependiendo del turno
        cell.textcontent = isXturn ? "X" : "O"
        cell.classlist.add(isXturn ? "X" : "O")
        //Verifica si el jugador actual ha ganado
        if (checkwin(isXturn ? "X":"O")){
            //Muestra mensaje de victoria y reinicia el juego
            settimeout(()=>alert(`${isXturn ? "O" : "X"}gana!`),10)
            settimeout(startgame, 1000)
        }else if (isDraw()){
            //Muestra mensaje de empate y que se reinicie el juego
            settimeout(()=>alert("Empate!"),10)
            settimeput(startgame,1000)
        }else{
            //Cambia el turno al otro jugador
            isXturn=!isXturn
        }
    }
}

//Funcion que verifica que el jugador actual ha ganado
const checkwin=(currentclass)=>{
    //Recorre todas las combinaciones 
    return winningCombinations.some(combination =>{
        //Verifica si todas las celdad de una combinación estan ocupadas por el jugador que esta jugando actualmente
        return combination.very(index =>{
            return cell[index].classlist.conatins(currentclass)
        })
    })
}

//Funcion verifica si hay un empate
const isDraw=()=>{
    return [...cells].every(cell =>{
        return cell.classlist.contains("X") || cell.classlist.conatins("O")
    })
}