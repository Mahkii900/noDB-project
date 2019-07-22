let hulls = [
    {class: "Scout",
    slots: [
        {name: 'none', type: 'engine'},
        {name: 'none', type: 'electrical'},
        {name: 'none', type: 'mechanical'}
        ]
    },
    {class: "Fighter",
    slots: [
        {name: 'none', type: 'engine'},
        {name: 'none', type: 'electrical'},
        {name: 'none', type: 'mechanical'},
        {name: 'none', type: 'weapons'},
        {name: 'none', type: 'shields'}
        ]
    },
    {class: "Battleship",
    slots: [
        {name: 'none', type: 'engine'},
        {name: 'none', type: 'electrical'},
        {name: 'none', type: 'mechanical'},
        {name: 'none', type: 'weapons'},
        {name: 'none', type: 'shields'},
        {name: 'none', type: 'armor'}
        ]
    },
    {class: "Freighter",
    slots: [
        {name: 'none', type: 'engine'},
        {name: 'none', type: 'mechanical'},
        {name: 'none', type: 'shields'},
        {name: 'none', type: 'armor'}
    ]
    }
]

module.exports = {
    getAllHulls: (req, res) => {
        res.status(200).send(hulls)
    }
}