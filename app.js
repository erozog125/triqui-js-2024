const gridVisual = document.querySelectorAll(".cell")

const getRandomNumber = (min, max) => Math.round(Math.random() * (max - min) + min)

let grid = [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
]

gridVisual.forEach((e, n) => {
	e.addEventListener("click", () => {
		let y = parseInt(n / 3), x = n % 3
		console.log(x, y)
		if (verifyValid([x, y])) {
			e.textContent = "X"
			grid[y][x] = 1
			cpuTurn()
		}
	})
})

function verifyVictory() {

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
			grid[cords[1]][cords[0]] = 2
			gridVisual[cords[0] + (cords[1] * 3)].textContent = "O"
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