const multer = require('multer')
const { storage, fileFilter } = require('../services/files')

module.exports = fileName => multer({ storage, fileFilter }).single(fileName)
