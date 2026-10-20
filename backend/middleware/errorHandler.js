const notFound = (req, res, next) => {
    const error = new Error(`Route not found.`)
    error.statusCode = 404;
    next(error)
}
const errorHandler = (err, req, res, next) => {
    let  statusCode = err.statusCode || 500;
    let message = err.message 

    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`
    }
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors)
        .map((e) => e.message)
        .join(", ");
    }
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(keyValue)[0];
        message = `${field} already exists`
    }
    if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError") {
        statusCode = 401;
        message = "Not authorized, token failed";
    }
    res.status(statusCode).json({message})
}
module.exports = { notFound, errorHandler }