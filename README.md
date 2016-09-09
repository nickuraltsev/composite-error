# composite-error

[![npm version](https://badge.fury.io/js/composite-error.svg)](https://badge.fury.io/js/composite-error)

'composite-errors' allows you to wrap and re-throw an error, providing additional context without losing the original error information.

## Overview

- You can wrap one or multiple errors into a `CompositeError`.
- You can use the `CompositeError` class as a base class for your own custom errors that can wrap other errors.
- The `stack` property of a `CompositeError` returns a string containing the stack trace of the `CompositeError` and the stack traces of the wrapped errors.

## Installation

```
$ npm install --save composite-error
```

## Usage

### Wrapping an error

```javascript
var CompositeError = require('composite-error');

try {
  doSomething();
} catch (error) {
  throw new CompositeError('Error occurred while trying to do something.', error);
}
```

### Wrapping multiple errors

```javascript
throw new CompositeError('Multiple errors occurred', [error1, error2]);
```

### Creating custom errors

Using the ES2015 class syntax:

```javascript
class MyCustomError extends CompositeError {
  constructor(message, innerErrors) {
    super(message, innerErrors);
    this.name = 'MyCustomError';
  }
}
```

Not using the ES2015 class syntax:

```javascript
var util = require('util');

function MyCustomError(message, innerErrors) {
    CompositeError.call(this, message, innerErrors);
    this.name = 'MyCustomError';
}

util.inherits(MyCustomError, CompositeError);
```

### Stack trace

The `stack` property of a `CompositeError` returns a string containing the stack trace of the `CompositeError` and the stack traces of the wrapped errors.

For example, the following code

```javascript
var firstError = new Error('First error');
var secondError = new CompositeError('Second error', firstError);
var thirdError = new CompositeError('Third error', secondError);
console.log(thirdError.stack);
```

will produce the following output:

```
CompositeError: Third error
    at Object.<anonymous> (/Users/nick/Projects/composite-error/example1.js:7:18)
    at Module._compile (module.js:460:26)
    at Object.Module._extensions..js (module.js:478:10)
    [... snipped for brevity ...]
--- Inner error: CompositeError: Second error
    at Object.<anonymous> (/Users/nick/Projects/composite-error/example1.js:6:19)
    at Module._compile (module.js:460:26)
    at Object.Module._extensions..js (module.js:478:10)
    [... snipped for brevity ...]
--- Inner error: Error: First error
    at Object.<anonymous> (/Users/nick/Projects/composite-error/example1.js:5:18)
    at Module._compile (module.js:460:26)
    at Object.Module._extensions..js (module.js:478:10)
    [... snipped for brevity ...]
--- End of inner error
--- End of inner error
```

### Accessing inner errors

The inner errors can be accessed using the `CompositeError#innerErrors` property.

## License

[MIT](https://github.com/nickuraltsev/composite-error/blob/master/LICENSE)
