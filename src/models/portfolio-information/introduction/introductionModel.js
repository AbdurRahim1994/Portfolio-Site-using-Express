const mongoose = require('mongoose');
const { Schema } = mongoose

const introductionSchema = new Schema({
    welcomeText: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    caption: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    }
}, { versionKey: false, timestamps: true });

const introductionModel = mongoose.model('introduction', introductionSchema)
module.exports = introductionModel;