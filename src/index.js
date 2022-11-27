const express = require('express')
const route = require('./routes/route')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const multer = require('multer')

app.use(bodyParser.json())
app.use(multer().any())
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb+srv://Lalit:g1b1eD2zYIwUl67Z@cluster0.xmtgwuj.mongodb.net/Project-2', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb is Connected'))
    .catch(err => console.log(err))

app.use('/', route)

app.listen(process.env.PORT || 3001, function () {
    console.log('Express app running on port', (process.env.PORT || 3001))
});