let ships = [
    {name: 'ship1',
    id: 1},
    {name: 'ship2',
    id: 2}
]

module.exports = {
    getAllShips: (req, res) => {
        res.status(200).send(ships)
    }
}