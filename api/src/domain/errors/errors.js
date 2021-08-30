class HttpError extends Error {
    constructor(statusCode, message, expose) {
        super(message);
        this.statusCode = statusCode || 500;
        this.expose = expose || true;
    }
}

module.exports = {
    HttpError
};
