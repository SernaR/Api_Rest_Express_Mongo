const express = require('express')
const bookController = require('../controllers/book')

const router = express.Router()

router.get('/books', bookController.findAll)
router.get('/books/:isbn', bookController.find)
router.post('/books', bookController.store)

module.exports = router

