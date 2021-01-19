const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
})

module.exports = mongoose.model('User', userSchema)