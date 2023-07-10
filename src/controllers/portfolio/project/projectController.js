const projectModel = require('../../../models/portfolio-information/project-information/projectModel')
const mongoose = require('mongoose')

exports.createProject = async (req, res) => {
    try {
        const postBody = req.body;
        const projectData = await new projectModel({
            title: postBody.title,
            technologies: postBody.technologies,
            liveLink: postBody.liveLink,
            gitRepo: postBody.gitRepo,
            description: postBody.description,
            image: postBody.image,

        }).save();

        res.status(200).json({ message: "Project create successful", result: projectData })
    }
    catch (error) {
        res.status(500).json({ message: "Project create failed", result: error })
    }
}

exports.getProjectById = async (req, res) => {
    try {
        const id = req.params.id;
        const paramId = new mongoose.Types.ObjectId(id);
        const projectData = await projectModel.aggregate([{ $match: { _id: paramId } }])
        if (projectData.length <= 0) {
            res.status(404).json({ message: "Project information not found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: projectData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

exports.updateProject = async (req, res) => {
    try {
        const id = req.params.id;
        const postBody = req.body;
        const paramId = new mongoose.Types.ObjectId(id);
        const isProjectExists = await projectModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        if (isProjectExists.length <= 0) {
            res.status(404).json({ message: "Project information not found" })
        }
        else {
            const projectData = await projectModel.updateOne({ _id: paramId }, postBody)
            res.status(200).json({ message: "Project update successful", result: projectData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Project update failed", result: error })
    }
}

exports.getAllProject = async (req, res) => {
    try {
        const projectData = await projectModel.aggregate([{ $project: { _id: 0 } }])
        if (projectData.length <= 0) {
            res.status(404).json({ message: "No project found" })
        }
        else {
            res.status(200).json({ message: "Successful", result: projectData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Failed", result: error })
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const id = req.params.id;
        const paramId = new mongoose.Types.ObjectId(id);
        const isProjectExists = await projectModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        if (isProjectExists.length <= 0) {
            res.status(404).json({ message: "Project information not found" })
        }
        else {
            const projectData = await projectModel.deleteOne({ _id: paramId });
            res.status(200).json({ message: "Project delete successful", result: projectData })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Project delete failed", result: error })
    }
}