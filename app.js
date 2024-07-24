const gridVisual = document.querySelectorAll(".cell")

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)
const checkHorizonal = (y, cpuOrPlayer) => grid[y][0] == cpuOrPlayer && grid[y][1] == cpuOrPlayer && grid[y][2] == cpuOrPlayer
const checkVertical = (x, cpuOrPlayer) => grid[0][x] == cpuOrPlayer && grid[1][x] == cpuOrPlayer && grid[2][x] == cpuOrPlayer
const checkPerpendicular1 = (cpuOrPlayer) => grid[0][0] == cpuOrPlayer && grid[1][1] == cpuOrPlayer && grid[2][2] == cpuOrPlayer
const checkPerpendicular2 = (cpuOrPlayer) => grid[0][2] == cpuOrPlayer && grid[1][1] == cpuOrPlayer && grid[2][0] == cpuOrPlayer

let grid = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
]
let playing = true
let win = 0
/*
 2 es maquina
 0 es neutral
 1 es el usuario
*/

gridVisual.forEach((e, n) => {
	e.addEventListener("click", () => {
		let y = parseInt(n / 3), x = n % 3
		console.log(x, y)
		if (verifyValid([x, y])) {
			if (playing) {
				e.textContent = "X"
				grid[y][x] = 1
				verifyVictory()
				cpuTurn()
			}
		}
	})
})

function verifyVictory() {
	for (let i = 0; i < 3; i++) {
		if (checkVertical(i, 1) || checkHorizonal(i, 1) || checkPerpendicular1(1) || checkPerpendicular2(1)) {
			win = 1
			break
		} else if (checkVertical(i, 2) || checkHorizonal(i, 2) || checkPerpendicular1(2) || checkPerpendicular2(2)) {
			win = 2
			break
		}
	}
	if (win == 1) {
		Swal.fire({
			imageUrl: "https://media1.tenor.com/m/UTrLSr85tYEAAAAC/happy-cat-cat.gif",
			title: "La humanidad ha ganado!",
			text: "Waos",
			confirmButtonText:"Volver a empezar"
		});
	} else if (win == 2) {
		Swal.fire({
			icon: "error",
			title: "La \"\"IA\"\" ha ganado...",
			text: "Ni modo",
			confirmButtonText:"Volver a empezar"
		});
	} else if (getEmpty() == 0) {
		Swal.fire({
			imageUrl: "https://media1.tenor.com/m/tmE2xQBnGmMAAAAC/really-spongebob.gif",
			title: "Ninguno de los dos ha ganado",
			text: "Wtf",
			confirmButtonText:"Volver a empezar"
		});
	}
}

function getEmpty ()  {
	let res = 0
	for (let y = 0; y < 3; y++)
		for (let x = 0; x < 3; x++)
			if (grid[y][x] == 0)
				res++
	return res
}

function verifyValid(cords) {
	/*
		0 = x
		1 = y
	*/
	return grid[cords[1]][cords[0]] == 0
}

function cpuTurn() {
	let cords, valid = false
	do {
		cords = randomCords()
		valid = verifyValid(cords)
		if (valid) {
			if (playing) {
				grid[cords[1]][cords[0]] = 2
				gridVisual[cords[0] + (cords[1] * 3)].textContent = "O"
				verifyVictory()
			}
			break
		} else if (getEmpty() <= 1) {
			break
		} else
			continue
	} while (!valid)
}

function randomCords() {
	return [getRandomNumber(0, 2), getRandomNumber(0, 2)]
}