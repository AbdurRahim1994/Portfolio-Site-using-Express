const mongoose = require('mongoose')
const { Schema } = mongoose

const educationSchema = new Schema({
    examTitle: {
        type: String,
        required: true
    },

    major: {
        type: String,
        required: true
    },

    institute: {
        type: String,
        required: true
    },

    cgpa: {
        type: Number,
        required: true
    },

    passingYear: {
        type: Number,
        required: true
    },

    duration: {
        type: Number,
        required: true
    }
}, { versionKey: false, timestamps: true })

const educationModel = mongoose.model('education', educationSchema)
module.exports = educationModel;