const User = require('../models/userService')
const jwt = require('jsonwebtoken')
const bcCrypt = require('bcryptjs')

class userController{

  async auth(req, res){
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email: email })
      
      if(!user) return res.status(400).json({error: "Login/Password incorrect"})        
      

      const passMatch = await bcCrypt.compare(password, user.password)
      if(!passMatch) return res.status(400).json({error: "Login/Password incorrect"})

      const token = jwt.sign({
        name: user.name,
        email: user.email
      }, process.env.JWT_SECRET,{
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

    if(!name || !password || !email) return res.status(400).json({error: "Missing data!!"})
  
    const existsUser = await User.findOne({ email: email })

    if(existsUser) return res.status(400).json({error: "Email exists"})

    const passwordHash = await bcCrypt.hash(password, 8)
  
    const user = {
      name,
      password: passwordHash,
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

      if(!user) return res.status(400).json({error: "User do not exists!!"})
    
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }

  async uypdate(req, res) {
    const id = req.params.id

    const {name, password, email} = req.body

    const passwordHash = await bcCrypt.hash(password, 8)

    const user = {
      name,
      password: passwordHash,
      email
    }
  
    try {
      const updatedUser = await User.updateOne({ _id: id }, user)

      const existsUser = await User.findOne({ email: email })
      if(existsUser) return res.status(400).json({error: "Email exists"})

      if(updatedUser.matchedCount === 0)return res.status(422).json({message: 'Usuário não encontrado'})
      
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({error: error})
    }
  }

  async delete(req, res) {
    const id = req.params.id

    const user = await User.findOne({ _id: id })

    if(!user) return res.status(400).json({error: "User do not exists!!"})
  
    try {
     await User.deleteOne({ _id: id })
    
      res.status(200).json('Deleted')
    } catch (error) {
      res.status(500).json({error: error})
    }
  }
}

module.exports = userController