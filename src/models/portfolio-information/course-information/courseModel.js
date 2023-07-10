const mongoose = require('mongoose');
const { Schema } = mongoose

const courseSchema = new Schema({
    certification: {
        type: String,
        required: true
    },

    institute: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },

    endDate: {
        type: Date,
        default: null
    },

    technologies: {
        type: Array,
        required: true
    }
}, { versionKey: false, timestamps: true })

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel