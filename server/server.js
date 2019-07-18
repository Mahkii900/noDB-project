const express = require('express')
const app = express()
const PORT = 4136
const shipCtrl = require('./controllers/ship-controller')
const hullCtrl = require('./controllers/hull-controllers')
const partsCtrl = require('./controllers/parts-controllers')

app.use(express.json())

//endpoints for ships
app.get('/api/ships', shipCtrl.getAllShips)

//endpoints for hulls
app.get('/api/hulls', hullCtrl.getAllHulls)

//endpoints for parts
app.get('/api/parts', partsCtrl.getAllParts)

app.listen(PORT, () => console.log(`Captain's Log #${PORT}: We are lost in space...`))