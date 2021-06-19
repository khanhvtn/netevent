class CustomError extends Error {
  constructor(code, errors, ...params) {
    super(...params);
    this.code = code;
    this.errors = errors;
  }
}
module.exports = CustomError;
