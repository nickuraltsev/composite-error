'use strict';

var CompositeError = require('..');

var firstError = new Error('First error');
var secondError = new CompositeError('Second error', firstError);
var thirdError = new CompositeError('Third error', secondError);

console.log(thirdError.stack);
