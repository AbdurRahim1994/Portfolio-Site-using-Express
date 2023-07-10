const educationModel = require('../../../models/portfolio-information/education-information/educationModel')
const mongoose = require('mongoose')

exports.createEducation = (req, res) => {
    const postBody = req.body;
    new educationModel({
        examTitle: postBody.examTitle,
        major: postBody.major,
        institute: postBody.institute,
        cgpa: postBody.cgpa,
        passingYear: postBody.passingYear,
        duration: postBody.duration
    }).save()
        .then((data) => {
            res.status(200).json({ message: "Education create successful", result: data })
        })
        .catch((error) => {
            res.status(500).json({ message: "Education create failed", result: error })
        })
}

exports.getEducationById = (req, res) => {
    const id = req.params.id
    const paramId = new mongoose.Types.ObjectId(id);
    educationModel.aggregate([{ $match: { _id: paramId } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Education information not found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.updateEducation = (req, res) => {
    const id = req.params.id;
    const postBody = req.body;
    const paramId = new mongoose.Types.ObjectId(id)
    educationModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Education information not found" })
            }
            else {
                educationModel.updateOne({ _id: id }, postBody)
                    .then((updated) => {
                        res.status(200).json({ message: "Education update successful", result: updated })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Education update failed", result: error })
        })
}

exports.getAllEducation = (req, res) => {
    educationModel.aggregate([{ $project: { _id: 0 } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "No education information found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.deleteEducation = (req, res) => {
    const id = req.params.id;
    const paramId = new mongoose.Types.ObjectId(id)
    educationModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Education information not found" })
            }
            else {
                educationModel.deleteOne({ _id: id })
                    .then((deleted) => {
                        res.status(200).json({ message: "Education delete successful", result: deleted })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Education delete failed", result: error })
        })
}