const mongoose = require('mongoose');
const { Schema } = mongoose

const aboutSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    skill: {
        type: Array,
        required: true
    }
}, { versionKey: false, timestamps: true });

const aboutModel = mongoose.model('About', aboutSchema);
module.exports = aboutModel