
const express = require('express')
const cors = require('cors')
const app = express()
const db = require('../Hotel_booking backend/Service/db')
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoute')
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(express.json())
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingRoute)
app.listen(8000, () => {
    console.log('Hotel Booking server is listening at port number 8000');
})
