const userModel = require('../../models/user-information/userModel')
const jwt = require('jsonwebtoken')

//User Registration
exports.registration = async (req, res) => {
    try {
        const { firstName, lastName, email, password, mobile } = req.body;
        const isEmailExists = await userModel.aggregate([{ $match: { email: email } }, { $count: "total" }])
        const isMobileExists = await userModel.aggregate([{ $match: { mobile: mobile } }, { $count: "total" }])
        if (!firstName) {
            res.json({ message: "First name required" })
        }
        else if (!lastName) {
            res.json({ message: "Last name required" })
        }
        else if (!email) {
            res.json({ message: "Email required" })
        }
        else if (!password) {
            res.json({ message: "Password required" })
        }
        else if (isEmailExists.length >= 1) {
            res.json({ message: "Email already exists" })
        }
        else if (isMobileExists.length >= 1) {
            res.json({ message: "Mobile number already exists" })
        }
        else {
            const user = await new userModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                mobile: mobile
            }).save();
            res.status(200).json({ message: "Registration successful", result: user })
        }
    }
    catch (error) {
        console.log(error);
    }
}

//User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.aggregate([
            { $match: { $and: [{ email: email }, { password: password }] } }
        ])
        if (user.length <= 0) {
            res.status(401).json({ message: "Unauthorized, email or password is invalid" })
        }
        else {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
                data: user[0].email
            }, 'SecretKey123456789')

            res.status(200).json({ message: "Login successful", result: user[0], token: token })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Login failed", result: error })
    }
}