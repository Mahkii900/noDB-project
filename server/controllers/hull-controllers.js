let hulls = [
    {name: "hull1",
    slots: ['engine', 'electrical', 'mechanical']},
    {name: "hull2",
    slots: ['engine', 'electrical', 'mechanical', 'weapons', 'shields']}
]

module.exports = {
    getAllHulls: (req, res) => {
        res.status(200).send(hulls)
    }
}