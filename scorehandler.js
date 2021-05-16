export { loadScores, saveScore }
const API_URL = 'http://localhost:6969/scores'

async function loadScores() {
	const response = await fetch(`${API_URL}/get`)
	const json = await response.json()
	console.log(json)
	loadScoresToDOM(json)
}

function loadScoresToDOM(scores) {
	const scoreBoard = document.querySelector('.scoreboard')
	Array.from(scores)
		.sort((a, b) => (a.score > b.score ? -1 : 1))
		.slice(0, 9)
		.forEach((score) => {
			const div = document.createElement('div')
			div.className = 'scoreboard_score'
			const name = document.createElement('p')
			const colonoscopy = document.createElement('p')
			const points = document.createElement('p')
			name.innerHTML = score.name
			colonoscopy.innerHTML = ':'
			points.innerHTML = score.score
			div.appendChild(name)
			div.appendChild(colonoscopy)
			div.appendChild(points)
			scoreBoard.appendChild(div)
		})
}

async function saveScore(name, score) {
	const entity = { name, score }
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(entity),
	}
	const response = await fetch(`${API_URL}/post`, options)
	if (response) {
		// celebrate with some fancy javascript
	}
}
