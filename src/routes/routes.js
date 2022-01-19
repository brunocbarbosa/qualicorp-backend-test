const router = require('express').Router()
const User = require('../models/userService')

router.post('/', async (req, res) => {
  const {name, password, email} = req.body

  if(!name || !password || !email) {
    res.status(400).json({error: "Missing data!!"})
    return
  }

  const existsUser = await User.findOne({ email: email })

  if(existsUser){
    res.status(400).json({error: "Email exists"})
    return
  }

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

router.get('/', async (req, res) => {
  try {
    const users = await User.find()

    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({error: error})
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
   
    
    if(!user){
      console.log('entrou')
      res.status(400).json({error: "User do not exists!!"})
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({error: error})
  }
})

module.exports = router
