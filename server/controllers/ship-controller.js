let ships = [
    {name: 'ship1',
    id: 1,
    hull: {
        name: "hull1",
        slots: ['engine', 'electrical', 'mechanical']
        }
    },
    {name: 'ship2',
    id: 2,
    hull: {
        name: "hull2",
        slots: ['engine', 'electrical', 'mechanical', 'weapons', 'shields']
        }
    }
]
let id = 3;
let hull = {
    name: "hull1",
    slots: ['engine', 'electrical', 'mechanical']
}

module.exports = {
    getAllShips: (req, res) => {
        res.status(200).send(ships)
    },

    addNewShip: (req, res) => {
        ships.push({...req.body, id: id, hull: hull})
        id++
        res.status(200).send(ships)
    }
}