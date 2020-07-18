const express = require('express')
const router = express.Router()

const userController = require('../controller/user')
const checkAuth = require('../middleware/check-auth')

router.post('/signup', userController.user_signup)

router.post('/signin', userController.user_signin)

router.delete('/:userId', userController.user_delete)

module.exports = router

