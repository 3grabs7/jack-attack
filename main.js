import {
	generateRandomWord,
	scrambleWord,
	sabotageWord,
	blankOutWord,
} from './wordhandler.js'

const button = document.querySelector('.main_startbutton button')
button.addEventListener('click', () => {
	const currentWord = document.querySelector('#currentword')
	const wrap = document.querySelector('.main_startbutton')
	const input = document.querySelector('.main_wordinput input')
	const timeLeft = document.querySelector('#timeleftcounter')

	currentWord.innerHTML = 'testanågot' // await generateRandomWord()
	wrap.classList.add('inactive')
	input.focus()
	let count = 10
	timeLeft.innerHTML = count
	setInterval(() => {
		count--
		if (count < 0) {
			timeLeft.innerHTML = ''
			wrap.classList.remove('inactive')
			return
		}
		timeLeft.innerHTML = count
	}, 1000)
})
