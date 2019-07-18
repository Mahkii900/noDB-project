let parts = ['part1', 'part2']

module.exports = {
    getAllParts: (req, res) => {
        res.status(200).send(parts)
    }
}