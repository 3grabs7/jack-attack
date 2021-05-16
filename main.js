import {
	generateRandomWord,
	scrambleWord,
	sabotageWord,
	blankOutWord,
} from './wordhandler.js'
import { loadScores, saveScore } from './scorehandler.js'
// load
document.addEventListener('DOMContentLoaded', () => {
	loadScores()
})
let global_isGameRunning = false
let global_timerInvterval

// main, start jack attacking
const button = document.querySelector('.main_startbutton button')
button.addEventListener('click', async () => {
	const currentWord = document.querySelector('#currentword')
	const wrap = document.querySelector('.main_startbutton')
	const input = document.querySelector('.main_wordinput input')
	const timeLeft = document.querySelector('#timeleftcounter')
	const correctAnswerAnimation = document.querySelector('#displaycorrectanswer')

	global_isGameRunning = true
	let currentPoints = 0
	let numberofWordsFinished = 0

	let wordToGuess = await generateRandomWord()
	currentWord.innerHTML = modeRouting[selectedMode](wordToGuess)

	wrap.classList.add('inactive')
	input.focus()

	let count = 20
	timeLeft.innerHTML = count
	global_timerInvterval = setInterval(() => {
		count--
		if (count > 3) {
			timeLeft.classList.remove('timesalmostup')
		}
		if (count === 3) {
			timeLeft.classList.add('timesalmostup')
		}
		// this is where it finally ends
		// save highscore, reset, repeat
		if (count < 1) {
			timeLeft.innerHTML = ''
			wrap.classList.remove('inactive')
			isGameRunning = false
			enterHighscore(currentPoints)
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
			// -----------------

			// if wrong, trigger keyframes and return
			if (wordToGuess !== userInput) {
				input.classList.add('wronganswer')
				setTimeout(() => {
					input.classList.remove('wronganswer')
				}, 1000)
				input.value = ''
				return
			}
			correctAnswerAnimation.innerText = wordToGuess
			correctAnswerAnimation.classList.add('rightanswer')
			setTimeout(() => {
				correctAnswerAnimation.innerText = ''
				correctAnswerAnimation.classList.remove('rightanswer')
			}, 1000)
			// if we got here, i guess they actually made it
			numberofWordsFinished++
			currentPoints += 1 * numberofWordsFinished
			input.value = ''
			count += 10
			wordToGuess = await generateRandomWord()
			currentWord.innerHTML = modeRouting[selectedMode](wordToGuess)
		}
	})
})

// Mode selection
const modeButtons = document.querySelectorAll('.header_modes button')
let selectedMode = 'Scrambler'
Array.from(modeButtons).forEach((mode) => {
	mode.addEventListener('click', (e) => {
		if (global_isGameRunning) {
			reset()
		}
		const [activemode] = e.target.classList
		if (activemode) {
			return
		}
		Array.from(modeButtons).forEach((update) => {
			update.classList?.remove('activemode')
		})
		e.target.classList.add('activemode')
		selectedMode = e.target.innerText
		console.log(selectedMode)
	})
})

// Mode routing
const modeRouting = {
	Scrambler: scrambleWord,
	Sabotage: sabotageWord,
	Blanked: blankOutWord,
}

// Reset
function reset() {
	clearInterval(global_timerInvterval)
	const wrap = document.querySelector('.main_startbutton')
	wrap.classList.remove('inactive')
	const input = document.querySelector('.main_wordinput input')
	input.innerHTML = ''
	const timeLeft = document.querySelector('#timeleftcounter')
	timeLeft.classList.add('inactive')
}

// This is a cat
function enterHighscore(score) {}

// testa sabotage, de e cooool
sabotageWord('kom de går änkan')
