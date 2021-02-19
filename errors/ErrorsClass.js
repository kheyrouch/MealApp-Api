const { model } = require("mongoose");

class BaseError extends Error {
    constructor(message, code){
        super(message);
        this.code = code
    }
}

module.exports = BaseError;