const express = require('express')
const referenceRouter = express.Router()
const referenceController = require('../controllers/portfolio/reference/referenceController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

referenceRouter.post('/createReference', referenceController.createReference);
referenceRouter.post('/updateReference/:id', referenceController.updateReference);
referenceRouter.get('/getReferenceById/:id', referenceController.getReferenceById);
referenceRouter.get('/getAllReference', referenceController.getAllReference);
referenceRouter.post('/deleteReference/:id', referenceController.deleteReference);

module.exports = referenceRouter;