const express = require('express')
const router = express.Router()
const Orders = require('../models/ordersModel')

router.get('/', async (req, res) => {
    try {
        // const orders = await Orders.find() //display list of orders
        res.send({"Message":"Connected to DB Successfully"})

    } catch (err) {
        res.send('error' + err)
    }
})

module.exports = router;