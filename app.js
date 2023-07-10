const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { readdirSync } = require('fs')
const mongoose = require('mongoose')

//Security middleware import
const cors = require('cors')
const expressRateLimit = require('express-rate-limit')
const helmet = require('helmet')

//Security middleware implement
app.use(cors())
app.use(helmet())

//Body parser implement
app.use(bodyParser.json())

//Rate limit
const limiter = expressRateLimit({
    windowMs: 1000 * 60 * 15,
    max: 3000
})

app.use(limiter)

//Route configuration
readdirSync('./src/routes').map(file => app.use(`/api/v1`, require(`./src/routes/${file}`)))

//Mongodb connection
const uri = 'mongodb+srv://AbdurRahim:<password>@cluster0.qooqrpl.mongodb.net/Portfolio-Site?retryWrites=true&w=majority'
const options = { user: 'AbdurRahim', pass: 'up3UWfVQsKvmUpC7' }
mongoose.connect(uri, options)
    .then(() => {
        console.log('Database connection successful')
    })
    .catch((error) => {
        console.log("Database connection failed")
    })

//Invalid API
app.use('*', (req, res) => {
    res.status(404).json({ message: "Failed", data: "Not Found" })
})

module.exports = app;
