const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)
            },
            message: `{VALUE} => Invalid email format`
        }
    },

    mobile: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value);
            },
            message: `{VALUE} => Invalid mobile number`
        }
    },

    photo: {
        type: String,
        default: ""
    },

    role: {
        type: Number,
        default: 0
    },

    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value);
            },
            message: 'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number'
        }
    }
}, { versionKey: false, timeseries: true })

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;