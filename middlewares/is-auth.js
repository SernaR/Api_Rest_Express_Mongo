const jwt = require('jsonwebtoken')
const { getUserId } = require('../services/jwt')
const ApiError = require('../error/api-error')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')

    const userId = getUserId(authHeader)
    if(!userId) {
        next(new ApiError(401, 'Not authenticated'))
    }

    req.userId = userId
    next()
}    



