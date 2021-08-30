class HttpError extends Error {
    constructor(statusCode, message, expose) {
        super(message);
        this.statusCode = statusCode || 500;
        this.expose = expose || false;

        console.log(`[${this.code}] ${this.message}`);
    }
}

module.exports = {
    HttpError
};
