const mongoose = require('mongoose');
const { Schema } = mongoose

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    technologies: {
        type: Array,
        required: true
    },

    liveLink: {
        type: String,
        required: true
    },

    gitRepo: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    }
}, { versionKey: false, timestamps: true })

const projectModel = mongoose.model('project', projectSchema);
module.exports = projectModel