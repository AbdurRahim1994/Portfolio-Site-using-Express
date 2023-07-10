const mongoose = require('mongoose');
const { Schema } = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

const contactModel = mongoose.model('contact', contactSchema);
module.exports = contactModel