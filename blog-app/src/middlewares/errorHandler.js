module.exports = (err, req, res, next) => {
    const statusCode = res.errStatusCode ?? 500;
    res.status(statusCode).send({
        success: false,
        message: err.message,
        cause: err.cause
    })
}