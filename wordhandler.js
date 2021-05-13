export { generateRandomWord, scrambleWord, sabotageWord, blankOutWord }

const generateRandomWord = async () => {
	const response = await fetch(
		'https://random-word-api.herokuapp.com/word?number=1'
	)
	const [word] = await response.json()
	return word
}

const scrambleWord = async () => {}

const sabotageWord = async () => {}

const blankOutWord = async () => {}
