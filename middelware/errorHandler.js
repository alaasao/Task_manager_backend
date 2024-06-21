const { CustomAPIError } = require('../errors/custom-error')
const errorHandlerMiddleware = (err, req, res, next) => {

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err.name === "CastError") {
    return res.status(500).json({ msg: "the form of id  that you entered is not correct" })
  }
  return res.status(500).json({ msg: err })
}

module.exports = errorHandlerMiddleware
