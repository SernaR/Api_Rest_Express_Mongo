const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
    // info: {
    //     type: Object,
    //     required: true
    // },
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)

