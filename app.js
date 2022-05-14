const express = require('express');
const mongoose = require('mongoose')

const app = express()

// mongodb URL
const url=''
mongoose.connect(url, {useNewUrlParser: true})

const connect = mongoose.connection
const ordersRoute = require('./routes/orders')
const indexRoute = require('./routes/index')
connect.on('open', function(){
    console.log("connected to db succesfully!")
})
app.use(express.json())

app.use('/orders', ordersRoute)
app.use('/', indexRoute)

module.exports = app;