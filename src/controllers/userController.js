const User = require('../models/userService')
const jwt = require('jsonwebtoken')

class userController{

  async auth(req, res){
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email: email })
      
      if(!user) {
        return res.status(400).json({error: "Missing data!!"})        
      }

      const token = jwt.sign({
        name: user.name,
        email: user.email
      }, "9df571d4410759b96d0a3103301ee55d",{
        subject: user.id,
        expiresIn: '1d'
      })

      res.status(200).json(token)

    } catch (error) {
      res.status(500).json({error: error})
    }
  }
  
  async create(req, res){
    const {name, password, email} = req.body

    if(!name || !password || !email) {
      return res.status(400).json({error: "Missing data!!"})
     
    }

    const existsUser = await User.findOne({ email: email })

    if(existsUser){
      return res.status(400).json({error: "Email exists"})
     
    }

    const user = {
      name,
      password,
      email
    }

    try {

      await User.create(user)

      return res.status(201).json({message: 'User created successful!!'})

    } catch (error) {
      return res.status(500).json({error: error})
    }
  }

  async getAll(req, res) {
    try {
      const users = await User.find()
  
      res.status(200).json(users)
  
    } catch (error) {
      res.status(500).json({error: error})
    }
  }

  async getOne(req, res) {
    const id = req.params.id
  
    try {
      const user = await User.findOne({ _id: id })

      if(!user){
        res.status(400).json({error: "User do not exists!!"})
        return
      }
  
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}

module.exports = userController