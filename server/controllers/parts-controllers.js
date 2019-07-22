let parts = [
    {
        name: "Fuel Mizer",
        type: 'engine'
    },
    {
        name: 'Interstellar X',
        type: 'engine'
    },
    {
        name: 'Sub-Space Scoop',
        type: 'engine'
    },
    {
        name: 'Galaxy Scoop',
        type: 'engine'
    },
    {
        name: 'Maneuvering Jets',
        type: 'mechanical'
    },
    {
        name: 'Cargo Bay',
        type: 'mechanical'
    },
    {
        name: 'Fuel Pod',
        type: 'mechanical'
    },
    {
        name: 'Battle Computer',
        type: 'electrical'
    },
    {
        name: 'Cloaking Device',
        type: 'electrical'
    },
    {
        name: 'Jammer',
        type: 'electrical'
    },
    {
        name: 'Gorilla Delegator',
        type: 'shields'
    },
    {
        name: 'Non-Euclidean',
        type: 'shields'
    },
    {
        name: 'Baryonic Repulsor',
        type: 'shields'
    },
    {
        name: 'Carbon-Fiber Plating',
        type: 'armor'
    },
    {
        name: 'Duranium Alloy',
        type: 'armor'
    },
    {
        name: 'Latantium Casing',
        type: 'armor'
    },
    {
        name: 'Bio-Ceramic Weave',
        type: 'armor'
    },
    {
        name: 'Anti-Matter Beam',
        type: 'weapons'
    },
    {
        name: 'Neutron Cannon',
        type: 'weapons'
    },
    {
        name: 'Shield Sapper',
        type: 'weapons'
    },
    {
        name: 'Ionic Blunderbluss',
        type: 'weapons'
    },
    {
        name: 'Scanner',
        type: 'electrical'
    }
]

module.exports = {
    getAllParts: (req, res) => {
        res.status(200).send(parts)
    },

    getPartByType: (req, res) => {
        const {type} = req.params
        const partsOfType = parts.filter(ele => ele.type === type)
        res.status(200).send(partsOfType)
    }
}