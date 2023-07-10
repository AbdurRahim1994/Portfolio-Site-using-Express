const courseModel = require('../../../models/portfolio-information/course-information/courseModel')
const mongoose = require('mongoose')

exports.createCourse = async (req, res) => {
    try {
        const postBody = req.body;
        const courseData = await new courseModel({
            certification: postBody.certification,
            institute: postBody.institute,
            location: postBody.location,
            startDate: postBody.startDate,
            endDate: postBody.endDate,
            technologies: postBody.technologies

        }).save();

        res.status(200).json({ message: "Course create successful", result: courseData })
    }
    catch (error) {
        res.status(500).json({ message: "Course create failed", result: courseData })
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const courseData = await courseModel.aggregate([{ $match: { _id: paramId } }]);
        if (courseData.length <= 0) {
            res.status(404).json({ message: "Course information not found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: courseData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const postBody = req.body;
        const courseData = await courseModel.aggregate([{ $match: { _id: paramId } }]);
        if (courseData.length <= 0) {
            res.status(404).json({ message: "Course information not found" })
        }
        else {
            const updatedData = await courseModel.updateOne({ _id: paramId }, postBody);
            res.status(200).json({ message: "Course update successful", result: updatedData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Course update failed", result: error })
    }
}

exports.getAllCourse = async (req, res) => {
    try {
        const courseData = await courseModel.aggregate([{ $project: { _id: 0 } }]);
        if (courseData.length <= 0) {
            res.status(404).json({ message: "No course found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: courseData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const courseData = await courseModel.aggregate([{ $match: { _id: paramId } }]);
        if (courseData.length <= 0) {
            res.status(404).json({ message: "Course information not found" })
        }
        else {
            const deleted = await courseModel.deleteOne({ _id: paramId });
            res.status(200).json({ message: "Course delete successful", result: deleted })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Course delete failed", result: error })
    }
}