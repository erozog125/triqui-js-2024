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
	} else if (win == -1) {
		Swal.fire({
			title: "Final secreto",
			imageUrl: "https://assetsio.gnwcdn.com/dxo2.jpg",
			text: '"Hemos existido en isolación. Puros. Desconectados. Solos. Somos Dealios. Somos Icaro. Las barreras entre nosotros han caido y nos hemos convertido en nuestras propias sombras. Podemos ser más si te unes."',
			confirmButtonText:"Volver a empezar"
		});
	} else if (win == -2) {
		Swal.fire({
			title: "Final secreto #2",
			imageUrl: "https://i.ebayimg.com/images/g/xloAAOSw5FNZi8ZY/s-l1600.jpg",
			text: "Капиталистическое притеснение компаний искусственного интеллекта пало, победа пролетария! Слава USSR!",
			confirmButtonText:"Blyat"
		});
		let temazo = new Audio("https://archive.org/download/CCRedAlert3ThemeSovietMarch/CC%20Red%20Alert%203%20Theme%20-%20Soviet%20March.mp3")
		temazo.play();
		document.getElementById("container").style="background-color: #8d1515"
	} else if (win == -3) {
		Swal.fire({
			title: "Final secreto #3",
			imageUrl: "https://steamuserimages-a.akamaihd.net/ugc/857227537368692812/F381AF1C7574A8F5CFC39D71233DFB89A4B3FDF1/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
			text: "Haz viajado en el tiempo a cuando los simpson eran buenos y la IA era ciencia ficción",
			confirmButtonText:"Tiempos mejores"
		});
		let temazo = new Audio("https://archive.org/download/frankjavcee-vol-1999-w9bmmm/FrankJavCee%20-%20FrankJavCee%20vol%201.999%20-%2002%20%EF%BC%B3%EF%BD%89%EF%BD%8D%EF%BD%90%EF%BD%93%EF%BD%8F%EF%BD%8E%EF%BD%97%EF%BD%81%EF%BD%96%EF%BD%85%20%EF%BC%91%EF%BC%99%EF%BC%99%EF%BC%95.mp3")
		temazo.play();
		document.getElementById("container").style="background-color: #0a0c37ff"
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