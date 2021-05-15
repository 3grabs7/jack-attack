const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/scoreboard', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
const db = mongoose.connection
db.once('open', () => {
	console.log(`Connected to database : '${db.name}'`)
})

const scoreSchema = new mongoose.Schema({ name: String, score: Number })
const Score = mongoose.model('ScoreBoard', scoreSchema)

exports.saveScore = (name, score) => {
	const newScore = new Score({ name, score })
	newScore.save((error) => {
		if (error) return console.error(error)
	})
}

exports.getScores = async () => {
	const result = await Score.find({}, '-_id -__v')
	return await result
}
