const fs = require('fs')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const ApiError = require('../error/api-error')
const User = require('../models/user')
const { generateToken } = require('../services/jwt')

class UserController {
    register(req, res, next) {
        const avatar = req.file ? req.file.path : null 

        bcrypt.hash(req.body.password, 12)
            .then(password => {
                const user = new User({ ...req.body, password, avatar } ) 
                return user.save()
            })
            .then( user => res.status(201).json(user._id.toString())) 
            .catch(err => next(err))
    }

    login(req, res, next) {
        const { email, password } = req.body
        let user

        User.findOne({ email })
            .then( userFound => {
                if(!userFound) {
                    next(ApiError.badRequest('Bad credentials'))
                    return
                }
                user = userFound
                return bcrypt.compare(password, user.password)
            })
            .then(isEqual => {
                if(!isEqual) {
                    next(ApiError.badRequest('Bad credentials'))
                    return
                }
                const token = generateToken(user)
                res.status(200).json(token) 
            })
            .catch(err => next(err))
    }
}

module.exports = new UserController()

//lors de l'update if(imageUrl !== user.imageUrl){clearImage(user.imageUrl)} user issu du find
const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => console.log(err))
}

