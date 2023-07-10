const express = require('express')
const contactRouter = express.Router();
const contactController = require('../controllers/portfolio/contact/contactController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

contactRouter.post('/createContact', contactController.createContact)
contactRouter.post('/updateContact/:id', contactController.updateContact)
contactRouter.post('/deleteContact/:id', contactController.deleteContact)
contactRouter.get('/getContactById/:id', contactController.getContactById)
contactRouter.get('/getAllContact', contactController.getAllContact)

module.exports = contactRouter;