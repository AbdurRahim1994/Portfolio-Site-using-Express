const express = require('express');
const experienceRouter = express.Router();
const experienceController = require('../controllers/portfolio/work-experience/experienceController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

experienceRouter.post('/createExperience', experienceController.createExperience)
experienceRouter.post('/updateExperience/:id', experienceController.updateExperience)
experienceRouter.post('/deleteExperience/:id', experienceController.deleteExperience)
experienceRouter.get('/getExperienceById/:id', experienceController.getExperienceById)
experienceRouter.get('/getAllExperience', experienceController.getAllExperience)

module.exports = experienceRouter;