const referenceModel = require('../../../models/portfolio-information/reference-information/referenceModel')
const mongoose = require('mongoose')

exports.createReference = (req, res) => {
    const postBody = req.body;
    new referenceModel({
        name: postBody.name,
        organization: postBody.organization,
        address: postBody.address,
        designation: postBody.designation,
        mobile: postBody.mobile,
        email: postBody.email,
        relation: postBody.relation,
    }).save()
        .then((data) => {
            res.status(200).json({ message: "Reference create successful", result: data })
        })
        .catch((error) => {
            res.status(500).json({ message: "Reference create failed", result: error })
        })
}

exports.getReferenceById = (req, res) => {
    const id = req.params.id
    const paramId = new mongoose.Types.ObjectId(id);
    referenceModel.aggregate([{ $match: { _id: paramId } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Reference information not found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.updateReference = (req, res) => {
    const id = req.params.id;
    const postBody = req.body;
    const paramId = new mongoose.Types.ObjectId(id)
    referenceModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Reference information not found" })
            }
            else {
                referenceModel.updateOne({ _id: id }, postBody)
                    .then((updated) => {
                        res.status(200).json({ message: "Reference update successful", result: updated })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Reference update failed", result: error })
        })
}

exports.getAllReference = (req, res) => {
    referenceModel.aggregate([{ $project: { _id: 0 } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "No Reference found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.deleteReference = (req, res) => {
    const id = req.params.id;
    const paramId = new mongoose.Types.ObjectId(id)
    referenceModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Reference information not found" })
            }
            else {
                referenceModel.deleteOne({ _id: id })
                    .then((deleted) => {
                        res.status(200).json({ message: "Reference delete successful", result: deleted })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Reference delete failed", result: error })
        })
}