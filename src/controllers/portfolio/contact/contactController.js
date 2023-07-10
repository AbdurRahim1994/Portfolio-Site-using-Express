const contactModel = require('../../../models/portfolio-information/contact-information/contactModel')
const mongoose = require('mongoose')

exports.createContact = (req, res) => {
    const postBody = req.body;
    new contactModel({
        name: postBody.name,
        email: postBody.email,
        mobile: postBody.mobile,
        address: postBody.address
    }).save()
        .then((data) => {
            res.status(200).json({ message: "Contact create successful", result: data })
        })
        .catch((error) => {
            res.status(500).json({ message: "Contact create failed", result: error })
        })
}

exports.getContactById = (req, res) => {
    const id = req.params.id
    const paramId = new mongoose.Types.ObjectId(id);
    contactModel.aggregate([{ $match: { _id: paramId } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Contact information not found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.updateContact = (req, res) => {
    const id = req.params.id;
    const postBody = req.body;
    const paramId = new mongoose.Types.ObjectId(id)
    contactModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Contact information not found" })
            }
            else {
                contactModel.updateOne({ _id: id }, postBody)
                    .then((updated) => {
                        res.status(200).json({ message: "Contact update successful", result: updated })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Contact update failed", result: error })
        })
}

exports.getAllContact = (req, res) => {
    contactModel.aggregate([{ $project: { _id: 0 } }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "No contact found" })
            }
            else {
                res.status(200).json({ message: "Successful", result: data })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Failed", result: error })
        })
}

exports.deleteContact = (req, res) => {
    const id = req.params.id;
    const paramId = new mongoose.Types.ObjectId(id)
    contactModel.aggregate([{ $match: { _id: paramId } }, { $count: "total" }])
        .then((data) => {
            if (data.length <= 0) {
                res.status(404).json({ message: "Contact information not found" })
            }
            else {
                contactModel.deleteOne({ _id: id })
                    .then((deleted) => {
                        res.status(200).json({ message: "Contact delete successful", result: deleted })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ message: "Contact delete failed", result: error })
        })
}