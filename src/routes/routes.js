const router = require('express').Router()
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const UserController = require('../controllers/userController')

const userController = new UserController

router.post('/user/login', userController.auth)

router.post('/user', userController.create)
router.get('/user', ensureAuthenticated, userController.getAll)
router.get('/user/:id', ensureAuthenticated, userController.getOne)

module.exports = router
