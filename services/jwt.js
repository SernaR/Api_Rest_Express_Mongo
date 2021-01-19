const jwt = require('jsonwebtoken')
const config = require('../config.json')
const JWT_SIGN_SECRET = config.jwtSignSecret

class Jwt {
    generateToken(user) {
        return jwt.sign({
            id: user._id.toString(),
            name: user.name,
            avatar: user.avatar
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    }
    getUserId(authorization) {
        const token = parseAuthorization(authorization) 
        let userId = null

        if(token) {
            try {
                const jwtToken = jwt.verify(token, JWT_SIGN_SECRET)
                userId = jwtToken.id
            } catch (error) {
                userId = null
            }
        }

        return userId
    }
}

module.exports = new Jwt()

parseAuthorization = authorization => {
    return authorization ? authorization.replace('Bearer ', '') : null
}
