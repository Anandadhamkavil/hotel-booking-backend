const express = require('express')
const router = express.Router()

const Room = require('../models/room')

router.get('/getallrooms',async(req,res) =>{

    try{
        const rooms = await Room.find({})
        res.send(rooms)
    }catch(error) { 
        return res.status(400).json({ message: error })
    }
})

router.post('/getroom/:id',async(req,res) =>{

    try{
        const rooms = await Room.findById(
            req.params.id
        )
        res.send(rooms)
    }catch(error) { 
        return res.status(400).json({ messge: error })
    }
})
router.post('/addroom',async(req,res) =>{

    try{
        const newroom = new Room(req.body)
        await newroom.save()
        res.send('New Room Added Successfully')
    }catch(error) { 
        return res.status(400).json({ messge: error })
    }
})

router.delete('/deleterooms/:id', async (req,res) => {
    try{
        const rooms = await Room.findByIdAndDelete(
            req.params.id
        )
        res.send(rooms)
    }catch(error) { 
        console.error(error);
        res.status(500).json({ message: 'Error deleting room', error });    }
  });

// router.put('/updaterooms/:id', async (req,res) => {
//     try{
//         const rooms = await Room.findByIdAndUpdate(
//             req.params.id,req.body,{ new: true }
//         )
//         res.send(rooms)
//     }catch(error) { 
//         console.error(error);
//         res.status(500).json({ message: 'Error updating room', error });    }
//   });

module.exports = router