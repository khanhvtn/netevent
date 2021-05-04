class CustomError extends Error {
    constructor(code, ...params) {
        super(...params);
        this.code = code;
    }
}
module.exports = CustomError;
