let hulls = [
    {class: "hull1",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'electrical', type: 'electrical'},
        {name: 'mechanical', type: 'mechanical'}
        ]
    },
    {class: "hull2",
    slots: [
        {name: 'engine', type: 'engine'},
        {name: 'electrical', type: 'electrical'},
        {name: 'mechanical', type: 'mechanical'},
        {name: 'weapons', type: 'weapons'},
        {name: 'shields', type: 'shields'}
        ]
    }
]

module.exports = {
    getAllHulls: (req, res) => {
        res.status(200).send(hulls)
    }
}