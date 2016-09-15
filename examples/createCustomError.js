'use strict';

const CompositeError = require('..');

class MyCustomError extends CompositeError {
  constructor(message, innerErrors) {
    super(message, innerErrors);
    this.name = 'MyCustomError';
  }
}

const originalError = new Error('Oops');
const myCustomError = new MyCustomError('Something went wrong', originalError);
console.log(myCustomError.stack);
