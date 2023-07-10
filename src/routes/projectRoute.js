const express = require('express');
const projectRouter = express.Router();
const projectController = require('../controllers/portfolio/project/projectController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

projectRouter.post('/createProject', projectController.createProject)
projectRouter.post('/updateProject/:id', projectController.updateProject)
projectRouter.get('/getProjectById/:id', projectController.getProjectById)
projectRouter.get('/getAllProject', projectController.getAllProject)
projectRouter.post('/deleteProject/:id', projectController.deleteProject)

module.exports = projectRouter;