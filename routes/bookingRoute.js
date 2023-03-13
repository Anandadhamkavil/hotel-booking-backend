const router = require('express').Router()
const Booking = require('../models/booking')
const Room = require('../models/room')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51Mi71wSJCzrTr9U40PaTNe3hvH7mxBqUZB51i4WlwRvbWR73QnlOkf0haFGmLUUL5myiDVbvfSkukxrwGDNLoqsR00JxWQPnfA')

router.post('/bookroom', async (req, res) => {

    const { room,
        // userid,
        fromdate,
        todate,
        totalamount,
        totalDays,
        // token
    } = req.body

    // try{
    //     const customer = await stripe.customers.create({
    //         email : token.email,
    //         source : token.id
    //     })

    //     const payment = await stripe.charges.create({
    //         amount : totalamount * 100,
    //         customer : customer.id,
    //         currency : 'inr',
    //         receipt_email : token.emai        
    //     },{
    //         idempotencyKey : uuidv4()
    //     })

    //     if(payment){
            
    //     }

    //     res.send('Payment Succesfull , Your Room is Booked')
    // }catch(error){
    //     return res.status(400).json({ error })
    // }


    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            // userid,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(fromdate).format('DD-MM-YYYY'),
            totalamount,
            totalDays,
            transactionId: '1234'
        })

        const booking = await newbooking.save()

        const roomtemp = await Room.findOne({ _id: room._id })
        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate).format('DD-MM-YYYY'), 
        todate: moment(todate).format('DD-MM-YYYY'),
        userid: userid,
        status: booking.status
    })
        res.send('Room Booked Successfully')
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.get('/getallbookings',async(req,res) => {
     
    try{
        const bookings = await Booking.find()
        res.send(bookings)
    }catch(error){
        return res.status(400).json({ error })
    }
})

module.exports = router
