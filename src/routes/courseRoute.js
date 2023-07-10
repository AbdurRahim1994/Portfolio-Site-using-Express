const express = require('express')
const courseRouter = express.Router();
const courseController = require('../controllers/portfolio/course/courseController')
const authVerifyMiddleware = require('../middlewares/authenticationMiddleware')

courseRouter.post('/createCourse', courseController.createCourse)
courseRouter.post('/updateCourse/:id', courseController.updateCourse)
courseRouter.post('/deleteCourse/:id', courseController.deleteCourse)
courseRouter.get('/getCourseById/:id', courseController.getCourseById)
courseRouter.get('/getAllCourse', courseController.getAllCourse)

module.exports = courseRouter;