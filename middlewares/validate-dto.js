const ApiError = require('../error/api-error')

const validateDto = (schema) => async (req, res, next) => {
  try {
    const validData = await schema.validate(req.body);
    req.body = validData;
    next()
  } catch (err) {
    next(ApiError.badRequest(err))
  }
}

module.exports = validateDto