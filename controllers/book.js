const ApiError = require('../error/api-error')
const Book = require('../models/book')

//req.params => url params
//req.query => ?

//faire middleware qui chek l'utilisateur
//pour ajouter dans une liste => User.books.push(bookId)
//pour enlever d'une liste => User.books.pull(bookId)

class BookController {

    findAll(req, res, next) {
        const currentPage = req.query.page || 1
        const perPage = 30
        let totalItems
        Book.find()
            //If you want to count all documents in a large collection, use the estimatedDocumentCount() function instead.
            .countDocuments()
            .then(count => {
                totalItems = count
                return Book.find()
                    .skip((currentPage -1) * perPage)
                    .limit(perPage)
            })
            .then(books => res.status(200).json({ books, totalItems })) //a checker
            .catch(err => next(err))
    }

    find(req, res, next) {
        const isbn = req.params.isbn
        Book.findOne({ isbn })
            .then(book => {
                if(!book) {
                    return next(ApiError.notFound('could not find isbn: ' + isbn))
                }
                res.status(200).json(book)
            })
            .catch(err => next(err)) 
    }
    
    
    store (req, res, next) {
        const owner = req.userId
        const book = new Book({ ...req.body, owner })
        book
            .save()
            .then(book => {
                res.status(201).json({ 
                    message: 'Post created successfully',
                    book
                })  
            })
            .catch(err => {
                console.log(err)
            })
        
        
    }
}

module.exports = new BookController()

// findAll: Book.find()
// find: Book.findOne()
// store: Book.save()
// edit: Book.save() ?? Model.findByIdAndUpdate() ou Model.findOneAndUpdate()
// remove Model.findByIdAndRemove() ou Model.findOneAndUpdate()