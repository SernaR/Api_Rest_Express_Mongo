const Yup = require('yup')

module.exports = Yup.object().shape({
    name: Yup.string().trim().required().min(3).max(30),
    email: Yup.string().required().email(),
    password: Yup.string().required().max(4096).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
})