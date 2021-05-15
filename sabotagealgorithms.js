export { replaceVowels, checkReplaceVowels }
// - byta åt ä/e å/o
// - om en konsonant(ej första) så gör dubbel (k blir ck)
// om dubbel vokal separerad av konsonant ta bort första/andra -> skrivit = skrivt / skrvit

function duplicateConsonant(word) {}

function checkDuplicateConsonant(word) {
	word.split('')
}

function replaceVowels(word) {
	let sabotagedWord = ''
	let matchIndex = []

	for (let i = 0; i < word.length; i++) {
		if (['ä', 'e', 'å', 'o'].includes(word[i])) {
			matchIndex.push(i)
		}
	}

	const index = matchIndex[Math.floor(Math.random() * matchIndex.length)]
	for (let i = 0; i < word.length; i++) {
		if (i === index) {
			if (word[i] === 'ä') {
				sabotagedWord += 'e'
				continue
			}
			if (word[i] === 'e') {
				sabotagedWord += 'ä'
				continue
			}
			if (word[i] === 'å') {
				sabotagedWord += 'o'
				continue
			}
			if (word[i] === 'o') {
				sabotagedWord += 'å'
				continue
			}
		}
		sabotagedWord += word[i]
	}
	return sabotagedWord
}

function checkReplaceVowels(word) {
	return (word.match(/[åäoe]/) || []).length > 0
}
