const express = require('express')
const router = express.Router()
const Orders = require('../models/ordersModel')

router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find()
        res.send(orders)

    } catch (err) {
        res.send('error' + err)
    }
})

// Create Order
router.post('/create', async (req, res) => {
    const order = new Orders(req.body)
    try {
        const orderData = await Orders.findOne({ order_id: req.body.order_id })
        if (orderData) {
            return res.status(400).json({ message: 'Order already exist with this order_id: ' + order.order_id })
        }
        else {
            order.save((err, data) => {
                if (err) res.status(400).json(err)
                else res.status(200).json({message: 'Order created succesfully' , data})
            })
        }
    } catch (err) {
        res.status(400).json(err)
    }
})

// Update Order
router.patch('/update/:id', async (req, res) => {
    const { id: orderId } = req.params;
    const deliveryDate = req.body.deliveryData

    const orders = await Orders.findOneAndUpdate({ order_id: orderId }, { $set: { delivery_date: deliveryDate } }, { new: true });
    if (orders) {
        res.status(200).json({message: 'Order updated succesfully' , orders})
    }
    else {
        res.status(400).json({ message: 'order id not found' })
    }
})


// List of Orders
router.get('/list', async (req, res) => {
    const orderDate = req.body.order_date;
    try {
        let pattern = /^([0-9]{4})\/([0-9]{2})\/([0-9]{2})$/;
        if (!pattern.test(orderDate)) {
            return res.status(400).json({ msg: `Please enter order date in yyyy/mm/dd format` });
        }
        const orders = await Orders.find({ order_date: orderDate })
        if (orders) {
            res.status(200).json({ message: 'order found succesfully', orders:orders })
        }
        else {
            res.status(400).json({ message: 'no order found with order date' })
        }
    } catch (err) {
        res.send('error' + err)
    }
})

// Delete Order
router.delete('/delete/:id', async (req, res) => {
    const { id: orderId } = req.params;
    const orders = await Orders.findOneAndDelete({ order_id: orderId })
    if (orders) {
        res.status(200).json({ message: 'order deleted succesfully', orders })
    }
    else {
        res.status(400).json({ message: 'order does not exist' })
    }
})


module.exports = router;