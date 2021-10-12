const houses = require('./db.json')
let globalID = 4

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houses)
    },
    deleteHouse: (req,res) => {
        const {id} = req.params
        let index = houses.findIndex((elem) => elem.id === +id)
        houses.splice(index,1)
        res.status(200).send(houses)
    },
    createHouse: (req,res) => {
        const {address, price, imageURL} = req.body
        const newHouse = {
            address,
            price: +price,
            imageURL,
            id: globalID
        }

        houses.push(newHouse)
        res.status(200).send(houses)
        globalID++
    },
    updateHouse: (req,res) => {
        const {id} = req.params
        const {type} = req.body

        let index = houses.findIndex((elem) => elem.id === +id)
        if ( type === 'plus') {
            houses[index].price = houses[index].price + 10000
            res.status(200).send(houses)
        } else if (houses[index].price <= 10000) {
            houses[index].price = 0
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price = houses[index].price - 10000
            res.status(200).send(houses)
        } else {
            res.status(400).send('Error, error, mayday')
        }
    }

}