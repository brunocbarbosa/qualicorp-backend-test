const router = require('express').Router()
const User = require('../models/userService')

router.post('/', async (req, res) => {
  const {name, password, email} = req.body

  if(!name || !password || !email) res.status(400).json({error: "Missing data!!"})

  const user = {
    name,
    password,
    email
  }

  try {
    
    await User.create(user)

    res.status(201).json({message: 'User created successful!!'})


  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router
