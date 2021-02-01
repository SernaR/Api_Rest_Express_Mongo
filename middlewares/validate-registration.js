const ApiError = require('../error/api-error')
const User = require('../models/user')
const { clearImage } = require ('../services/files')

const validateRegistration = (req, res, next) => {
    const { name, email } = req.body
    let message
    User.findOne( { $or:[{ name }, { email }] })
        .then( result => {
            if(result?.name === name) {
                checkAndDelete(req.file)
                return next(ApiError.badRequest( name + ' is already used'))
            }
            if(result?.email === email) {
                checkAndDelete(req.file)
                return next(ApiError.badRequest( email + ' is already used'))
            }

            //return next(ApiError.badRequest( email + ' is already used'))
            next()
        })
        .catch( err => next(err))
}

module.exports = validateRegistration

const checkAndDelete = file => {
    if(file) clearImage(file.path)
}