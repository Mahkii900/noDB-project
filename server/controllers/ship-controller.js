const images = require('../../image-files/spaceship-images')

let ships = [
    {name: 'Smaugarian Peeping Tom',
    image: images[0],
    id: 1,
    hull: {class: "Scout",
        slots: [
            {name: 'Fuel Mizer', type: 'engine'},
            {name: 'Scanner', type: 'electrical'},
            {name: 'Maneuvering Jets', type: 'mechanical'},
            {name: 'Carbon-Fiber Plating', type: 'armor'}
        ]
    }
    },
    {name: 'Space Hawk',
    image: images[1],
    id: 2,
    hull: {class: "Fighter",
        slots: [
            {name: 'Sub-Space Scoop', type: 'engine'},
            {name: 'Cloaking Device', type: 'electrical'},
            {name: 'Maneuvering Jets', type: 'mechanical'},
            {name: 'Anti-Matter Beam', type: 'weapons'},
            {name: 'Baryonic Repulsor', type: 'shields'}
        ]
    }
    },
    {name: 'Sun Bugle',
    image: images[2],
    id: 3,
    hull: {class: "Freighter",
        slots: [
            {name: 'Interstellar X', type: 'engine'},
            {name: 'Cargo Bay', type: 'mechanical'},
            {name: 'Gorilla Delegator', type: 'shields'},
            {name: 'Carbon-Fiber Plating', type: 'armor'}
        ]
    }
    }
]
let id = 4;
let hull = {class: "Scout",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'electrical', type: 'electrical'},
        {name: 'mechanical', type: 'mechanical'},
        {name: 'armor', type: 'armor'}
    ]
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
    },

    deleteShip: (req, res) => {
        const {id} = req.params
        const index = ships.findIndex(ele => ele.id === +id)
        ships.splice(index, 1)
        res.status(200).send(ships)
    }
}