
const router = require('express').Router()
const User = require('../models/user')

// REGISTER
router.post('/register', async (req,res)=> {

    const newUser =  new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
    })

   try{
        const user = await newUser.save() 
        res.send('Register Succesfull')
    }catch(error){
        res.status(400).json(error)
    }
})

// LOGIN
router.post('/login', async (req,res)=> {    

    try{
     const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
     })
     if(user){

        const temp = {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            _id: user._id
        }
         res.send(temp)
        } else{
            return res.status(400).json({ message : 'Login failed' })
        }
     }catch(error){
         res.status(400).json(error)
     }
 })

 router.get('/getallusers', async(req,res) => {
     
    try{
        const users = await User.find()
        res.send(users)
    }catch(error){
        res.status(400).json(error)
    }
 })


module.exports = router


