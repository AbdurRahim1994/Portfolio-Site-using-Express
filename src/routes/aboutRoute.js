const express = require('express')
const aboutRouter = express.Router()
const aboutController = require('../controllers/portfolio/personal/aboutController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

aboutRouter.post('/createAbout', aboutController.createAbout);
aboutRouter.post('/updateAbout/:id', aboutController.updateAbout);
aboutRouter.get('/getAboutById/:id', aboutController.getAboutById);
aboutRouter.get('/getAllAbout', aboutController.getAllAbout);
aboutRouter.post('/deleteAbout/:id', aboutController.deleteAbout);

module.exports = aboutRouter;