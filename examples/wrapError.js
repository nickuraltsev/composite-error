'use strict';

const CompositeError = require('..');

const firstError = new Error('First error');
const secondError = new CompositeError('Second error', firstError);
const thirdError = new CompositeError('Third error', secondError);

console.log(thirdError.stack);
