const User = require('../models/userService')

class userController{
  
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

  // async getOne(req, res) {
  //   const id = req.params.id
  
  //   try {
  //     const user = await User.findOne({ _id: id })

  //     if(!user){
  //       res.status(400).json({error: "User do not exists!!"})
  //       return
  //     }
  
  //     res.status(200).json(user)
  //   } catch (error) {
  //     res.status(500).json({error: error})
  //   }
  // }

  // async update(req, res){
  //   const id = req.params.id

  //   const {name, }
  // }
}

module.exports = userController