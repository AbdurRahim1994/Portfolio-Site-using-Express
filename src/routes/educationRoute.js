const express = require('express')
const educationRouter = express.Router();
const educationController = require('../controllers/portfolio/education/educationController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

educationRouter.post('/createEducation', educationController.createEducation);
educationRouter.post('/updateEducation/:id', educationController.updateEducation);
educationRouter.get('/getEducationById/:id', educationController.getEducationById);
educationRouter.get('/getAllEducation', educationController.getAllEducation);
educationRouter.post('/deleteEducation/:id', educationController.deleteEducation);

module.exports = educationRouter;