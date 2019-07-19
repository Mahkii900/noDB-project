let ships = [
    {name: 'ship1',
    id: 1},
    {name: 'ship2',
    id: 2}
]
let id = 3;

module.exports = {
    getAllShips: (req, res) => {
        res.status(200).send(ships)
    },

    addNewShip: (req, res) => {
        ships.push({...req.body, id: id})
        id++
        res.status(200).send(ships)
    }
}