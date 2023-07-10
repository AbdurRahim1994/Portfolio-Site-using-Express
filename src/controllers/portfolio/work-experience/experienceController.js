const experienceModel = require('../../../models/portfolio-information/work-exprience/experienceModel')
const mongoose = require('mongoose')

exports.createExperience = async (req, res) => {
    try {
        const postBody = req.body;
        const experienceData = await new experienceModel({
            position: postBody.position,
            company: postBody.company,
            startDate: postBody.startDate,
            endDate: postBody.endDate,
            address: postBody.address,
            responsibilities: postBody.responsibilities,

        }).save();

        res.status(200).json({ message: "Experience create successful", result: experienceData })
    }
    catch (error) {
        res.status(500).json({ message: "Experience create failed", result: error })
    }
}

exports.getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const experienceData = await experienceModel.aggregate([{ $match: { _id: paramId } }]);
        if (experienceData.length <= 0) {
            res.status(404).json({ message: "Experience information not found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: experienceData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

exports.updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const postBody = req.body;
        const experienceData = await experienceModel.aggregate([{ $match: { _id: paramId } }])
        if (experienceData.length <= 0) {
            res.status(404).json({ message: "Experience information not found" })
        }
        else {
            const updated = await experienceModel.updateOne({ _id: paramId }, postBody);
            res.status(200).json({ message: "Experience update successful", result: updated })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Experience update failed", result: error })
    }
}

exports.getAllExperience = async (req, res) => {
    try {
        const experienceData = await experienceModel.aggregate([{ $project: { _id: 0 } }])
        if (experienceData.length <= 0) {
            res.status(404).json({ message: "Experience information not found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: experienceData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

exports.deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const paramId = new mongoose.Types.ObjectId(id);
        const experienceData = await experienceModel.aggregate([{ $match: { _id: paramId } }]);
        if (experienceData.length <= 0) {
            res.status(404).json({ message: "Experience information not found" })
        }
        else {
            const deleted = await experienceModel.deleteOne({ _id: id });
            res.status(200).json({ message: "Experience delete successful", result: deleted })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Experience delete failed", result: error })
    }
}