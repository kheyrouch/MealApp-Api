const BaseError = require('./ErrorsClass');

const errorHandler = (err, req, res, next) => {
    const { message, code } = err;
    if ( err instanceof BaseError ) {
        res.status(code).json({
            success: false,
            err: message
        })
    }
}

module.exports = errorHandler;