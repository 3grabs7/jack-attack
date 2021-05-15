export { generateRandomWord, scrambleWord, sabotageWord, blankOutWord }
import { replaceVowels, checkReplaceVowels } from './sabotagealgorithms.js'

const generateRandomWord = async () => {
	const response = await fetch(
		'https://random-word-api.herokuapp.com/word?number=1'
	)
	const [word] = await response.json()
	return word
}

function scrambleWord(word) {
	let wordAsArray = [...word]
	let scrambledWord = ''
	while (wordAsArray.length) {
		const index = Math.floor(Math.random() * wordAsArray.length)
		scrambledWord += wordAsArray[index]
		wordAsArray.splice(index, 1)
	}
	return scrambledWord
}

function blankOutWord(word) {
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

// hitta index på alla åäeo
// välj en av index på random
// om å så o vice versa
// om ä så e vice versa
function sabotageWord(word) {
	if (checkReplaceVowels) {
		console.log(replaceVowels(word))
	}
}
