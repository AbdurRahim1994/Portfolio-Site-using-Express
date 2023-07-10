const express = require('express')
const userRouter = express.Router();
const userController = require('../controllers/user/userController')

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)

module.exports = userRouter