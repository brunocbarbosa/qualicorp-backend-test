const router = require('express').Router()
// const User = require('../models/userService')

const UserController = require('../controllers/userController')

const userController = new UserController

router.post('/user', userController.create)
router.get('/user', userController.getAll)
// router.get('/user/:id', userController.getOne)

module.exports = router
