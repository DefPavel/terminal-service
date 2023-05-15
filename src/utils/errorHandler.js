module.exports.errorHandler = (text, code = 500) => {
    const error = new Error(text);
    error.code = code;
    return error;
};