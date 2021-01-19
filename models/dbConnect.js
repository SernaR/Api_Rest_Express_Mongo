const mongoose = require('mongoose')

const config = require('../config.json')
const connectionString = config.dbConnection

mongoose.Promise = global.Promise
mongoose
    .connect(connectionString, { 
        useNewUrlParser: true, 
        useFindAndModify: false, 
        useUnifiedTopology: true, 
        useCreateIndex: true
    })
    .then(() => console.log('Connected to MongoDB !'))
    .catch(() => console.log('Connection to MongoDB failed !'));

module.exports = mongoose
