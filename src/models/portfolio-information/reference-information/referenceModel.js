const mongoose = require('mongoose')
const { Schema } = mongoose

const referenceSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    organization: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    designation: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    relation: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true })

const referenceModel = mongoose.model('reference', referenceSchema)
module.exports = referenceModel;