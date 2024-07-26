let board2 =[
    '', '', '',
    '', '', '',
    '', '', ''  
]
let turnos ="X"
let numero = document.querySelectorAll('.cell').forEach((cell,indexhtml)=>
    cell.addEventListener('click',()=>{
if (board[index.html]===''){
    board[index.html]= turnos
    cell.textContext =turnos
    if(ganar()){
        alert(`El gana ${turnos}!`)
        reboot()
    }else{
        turnos= turnos ==="X"?"O":"X"
document.getElementById('turnos').textContent= `El turno es ${turnos}`
    }
}
})
)
function ganar(){
    const combinacion =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

for(const combinations  of combinacion){
    if(board2[combinations[0]] === board2 [combinations[1]] && board2[combinations[1]]  === board2 [combinations[2]] && board2[combinations[2]]  === board2 [combinations[0]]){
        return true
    }
} return false
}

function reboot(){
    board2=['','','','','','','','','']
    turnos ="X"
    document.querySelectorAll('.cell').forEach((cell)=>{
        cell.textContext=""
    })
    document.getElementById('turnos').textContent = `El turno es ${turnos}`
}