const express = require('express')
const introductionRouter = express.Router()
const introductionController = require('../controllers/portfolio/introduction/introductionController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

introductionRouter.post('/createIntroduction', introductionController.createIntroduction)
introductionRouter.post('/updateIntroduction/:id', introductionController.updateIntroduction)
introductionRouter.post('/deleteIntroduction/:id', introductionController.deleteIntroduction)
introductionRouter.get('/getAllIntroduction', introductionController.getAllIntroduction)
introductionRouter.get('/getIntroductionById/:id', introductionController.getIntroductionById)


module.exports = introductionRouter