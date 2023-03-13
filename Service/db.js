const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

var mongoURL = 'mongodb://localhost:27017/HotelBooking'
mongoose.connect(mongoURL)

var connection = mongoose.connection
connection.on('error', ()=>{
    console.log('MongoDb connection is failed')
})
connection.on('connected', ()=>{
    console.log('MongoDb connection is succesfull')
})

module.exports = mongoose