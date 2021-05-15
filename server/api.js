const express = require('express')
const cors = require('cors')
const database = require('./database')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/scores/get', async (req, res) => {
	const result = await database.getScores()
	res.send(result)
})

app.post('/scores/post', (req, res) => {
	database.saveScore(req.body['name'], req.body['score'])
	res.send('de e cool 💫')
})

app.use('/', (req, res) => {
	res.send('you made it 💚')
})

const PORT = 6969
app.listen(PORT, () => {
	console.log(`api running on port ${PORT}`)
})
