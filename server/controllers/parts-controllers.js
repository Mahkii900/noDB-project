let parts = [
    {name: "part1",
    type: "mechanical"},
    {name: 'part2',
    type: "electrical"},
    {name: "part3",
    type: "mechanical"}
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