'use strict';

/**
 * Module dependencies.
 */

var util = require('util');

/**
 * Initializes a new instance of the CompositeError class.
 * @param {string} message The error message.
 * @param {(Error|Error[])} [innerErrors] The inner error(s).
 * @api public
 */

function CompositeError(message, innerErrors) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
    this.name = 'CompositeError';
    this.message = message;
    this.innerErrors = normalizeInnerErrors(innerErrors);
    this.originalStackDescriptor = Object.getOwnPropertyDescriptor(this, 'stack');
    // Override the stack property
    Object.defineProperty(this, 'stack', {
        get: function() { return this.formatStackTraces(); }
    });
}

/**
 * Inherits from Error.
 */

util.inherits(CompositeError, Error);

/**
 * Gets a string containing the stack trace of the current error.
 * @name CompositeError#ownStack
 * @type String
 * @readonly
 * @api public
 */

Object.defineProperty(CompositeError.prototype, 'ownStack', {
    get: function() {
         return this.originalStackDescriptor.get.call(this);
    }
});

/*
 * Returns a string containing the stack traces of the current error and all its inner errors.
 * @returns {string} The error stack traces as a string.
 * @api private
 */

CompositeError.prototype.formatStackTraces = function() {
    var result = this.ownStack;
    for (var i = 0; i < this.innerErrors.length; i++) {
        // If there are more than one inner error, add the error number (#0, #1, ...)
        var errorNumber = this.innerErrors.length > 1 ? ' #' + i : '';
        result +=
            '\n--- Inner error' +
            errorNumber +
            ': ' +
            this.innerErrors[i].stack +
            '\n--- End of inner error';
    }
    return result;
};

function normalizeInnerErrors(value) {
    if (value) {
        return util.isArray(value) ? value : [value];
    }
    return [];
}

/**
 * Module exports.
 */

module.exports = CompositeError;
