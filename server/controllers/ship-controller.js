let ships = [
    {name: 'ship1',
    id: 1,
    hull: {name: "hull1",
        slots: [
            {name: 'engine', type: 'engine'},
            {name: 'electrical', type: 'electrical'},
            {name: 'mechanical', type: 'mechanical'}
        ]
    }
    },
    {name: 'ship2',
    id: 2,
    hull: {name: "hull2",
        slots: [
            {name: 'engine', type: 'engine'},
            {name: 'electrical', type: 'electrical'},
            {name: 'mechanical', type: 'mechanical'},
            {name: 'weapons', type: 'weapons'},
            {name: 'shields', type: 'shields'}
        ]
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
    },

    updateShip: (req, res) => {
        const {id} = req.params
        const index = ships.findIndex(ele => ele.id === +id)
        ships[index] = {...ships[index], ...req.body}
        res.status(200).send(ships)
    }
}