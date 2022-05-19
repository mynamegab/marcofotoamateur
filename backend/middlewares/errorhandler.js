export default (err, req, res, next) => {
    console.error(err.internalMessage || err.message, err.stack);

    const statusCode = err.statusCode || 500;
    const message = statusCode === 500
        // Prevent exposing too many details
        ? "Internal server error"
        : err.message;

    res.status(statusCode)
        .json({ message });
};