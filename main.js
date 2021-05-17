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
	const input = document.querySelector('.main_wordinput input')
	input.disabled = true
})
let global_isGameRunning = false
let global_timerInterval
let global_currentPoints

// main, start jack attacking
const button = document.querySelector('.main_startbutton button')
button.addEventListener('click', async () => {
	const currentWord = document.querySelector('#currentword')
	const wrap = document.querySelector('.main_startbutton')
	const input = document.querySelector('.main_wordinput input')
	const timeLeft = document.querySelector('#timeleftcounter')
	const correctAnswerAnimation = document.querySelector('#displaycorrectanswer')

	global_isGameRunning = true
	global_currentPoints = 0
	let numberofWordsFinished = 0

	let wordToGuess = await generateRandomWord()
	currentWord.innerHTML = modeRouting[selectedMode](wordToGuess)

	wrap.classList.add('inactive')
	input.disabled = false
	input.focus()

	let count = 10
	timeLeft.innerHTML = count
	timeLeft.classList.remove('inactive')
	global_timerInterval = setInterval(() => {
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
			const highscoreSubmission = document.querySelector('.highscoresubmission')
			const nameInput = document.querySelector('#highscorename')

			highscoreSubmission.classList.remove('inactive')
			nameInput.focus()
			wrap.classList.remove('inactive')
			timeLeft.innerHTML = ''
			reset()
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
			global_currentPoints += 1 * numberofWordsFinished
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
	clearInterval(global_timerInterval)
	const wrap = document.querySelector('.main_startbutton')
	const input = document.querySelector('.main_wordinput input')
	const timeLeft = document.querySelector('#timeleftcounter')
	const currentWord = document.querySelector('#currentword')

	global_isGameRunning = false
	wrap.classList.remove('inactive')
	input.value = ''
	input.disabled = true
	timeLeft.classList.add('inactive')
	currentWord.innerHTML = ''
}

// This is a cat
const submitHighscoreButton = document.querySelector('#submithighscore')
submitHighscoreButton.addEventListener('click', async () => {
	const nameInput = document.querySelector('#highscorename')
	const highscoreSubmission = document.querySelector('.highscoresubmission')

	await saveScore(nameInput.value, global_currentPoints)
	highscoreSubmission.classList.add('inactive')
	await loadScores()
})

// testa sabotage, de e cooool
//sabotageWord('kom de går änkan')
