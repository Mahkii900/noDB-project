let hulls = [
    {class: "Scout",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'electrical', type: 'electrical'},
        {name: 'mechanical', type: 'mechanical'}
        ]
    },
    {class: "Destroyer",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'electrical', type: 'electrical'},
        {name: 'mechanical', type: 'mechanical'},
        {name: 'weapons', type: 'weapons'},
        {name: 'shields', type: 'shields'}
        ]
    },
    {class: "Battleship",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'electrical', type: 'electrical'},
        {name: 'mechanical', type: 'mechanical'},
        {name: 'weapons', type: 'weapons'},
        {name: 'shields', type: 'shields'},
        {name: 'armor', type: 'armor'}
        ]
    },
    {class: "Freighter",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'mechanical', type: 'mechanical'},
        {name: 'shields', type: 'shields'},
        {name: 'armor', type: 'armor'}
    ]
    }
]

module.exports = {
    getAllHulls: (req, res) => {
        res.status(200).send(hulls)
    }
}