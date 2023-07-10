const aboutModel = require('../../../models/portfolio-information/personal-information/aboutModel')
const mongoose = require('mongoose')

exports.createAbout = async (req, res) => {
    try {
        const postBody = req.body;
        const aboutData = await aboutModel.create(postBody)
        res.status(200).send({ message: "About create successful", result: aboutData })
    }
    catch (error) {
        res.status(500).send({ message: "About create failed", result: error })
    }
}

exports.updateAbout = async (req, res) => {
    try {
        const { id } = req.params;
        const postBody = req.body;
        const paramId = new mongoose.Types.ObjectId(id)
        const isAboutDataExists = await aboutModel.aggregate([{ $match: { _id: paramId } }])
        if (isAboutDataExists.length <= 0) {
            res.status(404).json({ message: "About information not found" })
        }
        else {
            const aboutUpdated = await aboutModel.updateOne({ _id: id }, postBody);
            res.status(200).json({ message: "About update successful", result: aboutUpdated })
        }
    }
    catch (error) {
        res.status(500).send({ message: "About update failed", result: error })
    }
}

exports.getAboutById = (req, res) => {
    const { id } = req.params;
    const paramId = new mongoose.Types.ObjectId(id)
    aboutModel.aggregate([{ $match: { _id: paramId } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "About information not found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.getAllAbout = (req, res) => {
    aboutModel.aggregate([{ $project: { _id: 0 } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "About information not found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.deleteAbout = (req, res) => {
    const { id } = req.params;
    const paramId = new mongoose.Types.ObjectId(id)
    aboutModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "About information not found" })
            }
            else {
                aboutModel.deleteOne({ _id: id })
                    .then((data) => {
                        res.status(200).json({ message: "About delete successful", result: data })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "About delete failed", result: error })
        })
}