'use strict';

var CompositeError = require('..');
var util = require('util');

function MyCustomError(message, innerErrors) {
    CompositeError.call(this, message, innerErrors);
    this.name = 'MyCustomError';
}

util.inherits(MyCustomError, CompositeError);

var originalError = new Error('Oops');
var myCustomError = new MyCustomError('Something went wrong', originalError);
console.log(myCustomError.stack);
