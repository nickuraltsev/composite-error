'use strict';

var CompositeError = require('..');

var error1 = new Error('Something went wrong');
var error2 = new Error('Something else went wrong');
var compositeError = new CompositeError('Multiple errors occurred', [error1, error2]);

console.log(compositeError.stack);
