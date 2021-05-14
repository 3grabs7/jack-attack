export { generateRandomWord, scrambleWord, sabotageWord, blankOutWord }

const generateRandomWord = async () => {
	const response = await fetch(
		'https://random-word-api.herokuapp.com/word?number=1'
	)
	const [word] = await response.json()
	return word
}

const scrambleWord = (word) => {
	let wordAsArray = [...word]
	let scrambledWord = ''
	while (wordAsArray.length) {
		const index = Math.floor(Math.random() * wordAsArray.length)
		scrambledWord += wordAsArray[index]
		wordAsArray.splice(index, 1)
	}
	return scrambledWord
}

const sabotageWord = (word) => {
	// sjuk funktion för att slinga in små stavfel os
}

const blankOutWord = (word) => {
	const keep = []
	while (keep.length < word.length / 2) {
		let index = Math.floor(Math.random() * word.length)
		if (!keep.includes(index)) {
			keep.push(index)
		}
	}
	let blankedOutWord = ''
	for (let i = 0; i < word.length; i++) {
		if (keep.includes(i)) {
			blankedOutWord += word[i]
			continue
		}
		blankedOutWord += '_'
	}
	return {
		blankedOutWord: blankedOutWord,
		orginalWord: word,
	}
}
