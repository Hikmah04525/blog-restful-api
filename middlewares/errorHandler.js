const errorHandler = (err, req, res, next) => {
    const code = err.statusCode || 500;

    res.status(code).json({
        code,
        status: false,
        message: err.message,
        stack: err.stack
    });
};

module.exports = errorHandler;
