const path = require('path')
const express = require('express')

const dbConnection = require('./models/dbConnect')

const cors = require ('./middlewares/cors')
const apiErrorHandler = require('./error/api-error-handler')
const pageNotFound = require('./error/pageNotFound')

const apiRoutes = require('./routes')
const apiUserRoutes = require('./routes/user')
const isAuth = require('./middlewares/is-auth')

const app = express()

app.use(express.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cors)

app.use('/api', apiRoutes)
app.use('/api/users', isAuth, apiUserRoutes)
app.use("/", pageNotFound)

app.use(apiErrorHandler)
app.listen(8080, () => console.log('server running on port 8080'))




