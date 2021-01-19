const pageNotFound = (req, res, next) => {
    res.status(404).json('Page not found')
}

module.exports = pageNotFound