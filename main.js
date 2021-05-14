import {
	generateRandomWord,
	scrambleWord,
	sabotageWord,
	blankOutWord,
} from './wordhandler.js'

const button = document.querySelector('.main_startbutton button')
button.addEventListener('click', async () => {
	const currentWord = document.querySelector('#currentword')
	const wrap = document.querySelector('.main_startbutton')
	const input = document.querySelector('.main_wordinput input')
	const timeLeft = document.querySelector('#timeleftcounter')

	let wordToGuess = await generateRandomWord()
	currentWord.innerHTML = scrambleWord(wordToGuess)
	wrap.classList.add('inactive')
	input.focus()

	let count = 10
	timeLeft.innerHTML = count
	setInterval(() => {
		count--
		if (count > 3) {
			timeLeft.classList.remove('timesalmostup')
		}
		if (count === 3) {
			timeLeft.classList.add('timesalmostup')
		}
		if (count < 0) {
			timeLeft.innerHTML = ''
			wrap.classList.remove('inactive')
			return
		}
		timeLeft.innerHTML = count
	}, 1000)

	input.addEventListener('keydown', async (e) => {
		const userInput = input.value
		if (e.key === 'Enter') {
			// -----------------
			// -- Cheat Sheet --
			// -----------------
			console.log(wordToGuess)
			console.log(userInput)
			console.log(e.key)
			// -----------------

			// if wrong, trigger keyframes and return
			if (wordToGuess !== userInput) {
				input.classList.add('wronganswer')
				setTimeout(() => {
					input.classList.remove('wronganswer')
				}, 3000)
				input.value = ''
				return
			}
			// if we got here, i guess they actually made it
			input.value = ''
			count += 5
			wordToGuess = await generateRandomWord()
			currentWord.innerHTML = scrambleWord(wordToGuess)
			// maybe some cool animations as reward?
		}
	})
})
