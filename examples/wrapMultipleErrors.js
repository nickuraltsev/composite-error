'use strict';

const CompositeError = require('..');

const error1 = new Error('Something went wrong');
const error2 = new Error('Something else went wrong');
const compositeError = new CompositeError('Multiple errors occurred', [error1, error2]);

console.log(compositeError.stack);
