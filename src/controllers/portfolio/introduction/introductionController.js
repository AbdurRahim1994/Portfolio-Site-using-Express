const mongoose = require('mongoose');
const introductionModel = require('../../../models/portfolio-information/introduction/introductionModel')

exports.createIntroduction = (req, res) => {
    const postBody = req.body;
    introductionModel.create(postBody)
        .then((data) => {
            res.status(200).send({ message: "Introduction create successful", result: data })
        })
        .catch((error) => {
            res.status(500).send({ message: "Introduction create failed", result: error })
        })
}

exports.updateIntroduction = async (req, res) => {
    try {
        const { id } = req.params;
        const postBody = req.body;
        const isIntroExists = await introductionModel.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(id) } }, { $count: "total" }]);
        if (isIntroExists.length <= 0) {
            res.status(404).json({ message: "Introduction information not found" })
        }
        else {
            const introUpdate = await introductionModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, postBody);
            res.status(200).json({ message: "Introduction updated successfully", result: introUpdate })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Introduction update failed", result: error })
    }
}

exports.getIntroductionById = (req, res) => {
    const { id } = req.params;
    introductionModel.aggregate([{ $match: { _id: new mongoose.Types.ObjectId(id) } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Introduction information not found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.deleteIntroduction = async (req, res) => {
    try {
        const { id } = req.params
        const paramId = new mongoose.Types.ObjectId(id)
        const isIntroExists = await introductionModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        if (isIntroExists.length <= 0) {
            res.status(404).json({ message: "Introduction information not found" })
        }
        else {
            const introDelete = await introductionModel.deleteOne({ _id: paramId });
            res.status(200).json({ message: "Introduction delete successful", result: introDelete })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Introduction delete failed", result: error })
    }
}

exports.getAllIntroduction = async (req, res) => {
    try {
        const introData = await introductionModel.aggregate([
            { $project: { _id: 0 } }
        ]);
        if (introData.length <= 0) {
            res.status(404).json({ message: "Introduction information not found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: introData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

