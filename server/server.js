const express = require('express')
const app = express()
const PORT = 4136
const shipCtrl = require('./controllers/ship-controller')

app.use(express.json())

//endpoints for ships
app.get('/api/ships', shipCtrl.getAllShips)

app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))