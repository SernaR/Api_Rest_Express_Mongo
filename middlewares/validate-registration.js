const ApiError = require('../error/api-error')
const User = require('../models/user')

const validateRegistration = (req, res, next) => {
    const { name, email } = req.body
    User.findOne( { $or:[{ name }, { email }] })
        .then( result => {
            if(result?.name === name) {
                return next(ApiError.badRequest( name + ' is already used'))
            }
            if(result?.email === email) {
                return next(ApiError.badRequest( email + ' is already used'))
            }
            next()
        })
        .catch( err => next(err))
}

module.exports = validateRegistration