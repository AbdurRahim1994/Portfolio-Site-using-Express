const mongoose = require('mongoose');
const { Schema } = mongoose

const experienceSchema = new Schema({
    position: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    address: {
        type: String,
        default: ""
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        default: null
    },

    responsibilities: {
        type: Array,
        default: []
    }
}, { versionKey: false, timestamps: true })

const experienceModel = mongoose.model('experience', experienceSchema);
module.exports = experienceModel