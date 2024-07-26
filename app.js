// Selecciona todas las celdas del tablero
const cells = document.querySelectorAll('[data-cell]');
// Inicializa el turno de los jugadores, empezando con 'X'
let isCircleTurn = false;

// Define todas las combinaciones ganadoras posibles
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Función que maneja el clic en una celda
const handleClick = (e) => {
  const cell = e.target;
  // Si la celda está vacía, coloca una marca
  if (cell.textContent === '') {
    // Coloca 'O' o 'X' dependiendo del turno
    cell.textContent = isCircleTurn ? 'O' : 'X';
    // Añade la clase correspondiente para estilizar la celda
    cell.classList.add(isCircleTurn ? 'circle' : 'x');
    // Verifica si el jugador actual ha ganado
    if (checkWin(isCircleTurn ? 'circle' : 'x')) {
      // Muestra un mensaje de victoria y reinicia el juego después de 1 segundo
      setTimeout(() => alert(`${isCircleTurn ? 'O' : 'X'} gana!`), 10);
      setTimeout(startGame, 1000);
    } else if (isDraw()) {
      // Si hay empate, muestra un mensaje y reinicia el juego después de 1 segundo
      setTimeout(() => alert('Empate!'), 10);
      setTimeout(startGame, 1000);
    } else {
      // Cambia el turno al otro jugador
      isCircleTurn = !isCircleTurn;
    }
  }
};

// Función que verifica si el jugador actual ha ganado
const checkWin = (currentClass) => {
  // Recorre todas las combinaciones ganadoras
  return winningCombinations.some(combination => {
    // Verifica si todas las celdas de una combinación están ocupadas por el jugador actual
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
};

// Función que verifica si hay empate
const isDraw = () => {
  // Verifica si todas las celdas están ocupadas
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('circle');
  });
};

// Función que inicia el juego
const startGame = () => {
  // Reinicia el turno al jugador 'X'
  isCircleTurn = false;
  // Limpia todas las celdas y añade el evento de clic
  cells.forEach(cell => {
    cell.classList.remove('x', 'circle');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
};

// Inicia el juego al cargar la página
startGame();