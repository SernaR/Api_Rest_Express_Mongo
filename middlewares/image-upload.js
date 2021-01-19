const multer = require('multer')
const { storage, fileFilter } = require('../services/multer-config')

module.exports = multer({ storage, fileFilter }).single('image')
