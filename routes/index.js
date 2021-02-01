const express = require('express')
const userController = require('../controllers/user')

const validateRegistration = require('../middlewares/validate-registration')
const registerDto = require('../dto/register')
const validateDto = require('../middlewares/validate-dto')
const imageUpload = require('../middlewares/image-upload')

const router = express.Router()

router.post('/login', userController.login)
router.post('/register', imageUpload('avatar'), validateDto(registerDto), validateRegistration, userController.register)

module.exports = router
