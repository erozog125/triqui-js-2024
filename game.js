const one = document.getElementById ('one');
const two = document.getElementById ('two');
const three = document.getElementById ('three');
const four = document.getElementById ('four');
const five = document.getElementById ('five');
const six = document.getElementById ('six');
const seven = document.getElementById ('seven');
const eight = document.getElementById ('eight');
const nine = document.getElementById ('nine');

let character = '';


const board = [
    [one, two, three],
    [four, five, six],
    [seven, eight, nine]
  ];

one.addEventListener('click', pressOne);

function pressOne (){
    one.textContent = 'X';
    console.log("Funciona");
}


