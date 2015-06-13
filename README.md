# composite-error

This module provides a class named `CompositeError` that extends the standard `Error` class with the ability to wrap
other errors.

## Installation

```
$ npm install composite-error
```

## Usage

You can wrap an error into a `CompositeError` to provide additional context without losing the original error
information.

```javascript
var CompositeError = require('composite-error');

var firstError = new Error('First error');
var secondError = new CompositeError('Second error', firstError);
var thirdError = new CompositeError('Third error', secondError);
console.log(thirdError.stack);
```

This code will produce the following output:

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

### Wrapping multiple errors

You can also wrap multiple errors into a `CompositeError`.

```javascript
var CompositeError = require('composite-error');

var error1 = new Error('Something went wrong');
var error2 = new Error('Something else went wrong');
var compositeError = new CompositeError('Multiple errors occurred', [error1, error2]);
console.log(compositeError.stack);
```

This code will produce the following output:

    CompositeError: Multiple errors occurred
        at Object.<anonymous> (/Users/nick/Projects/composite-error/example2.js:7:22)
        at Module._compile (module.js:460:26)
        at Object.Module._extensions..js (module.js:478:10)
        [... snipped for brevity ...]
    --- Inner error #0: Error: Something went wrong
        at Object.<anonymous> (/Users/nick/Projects/composite-error/example2.js:5:14)
        at Module._compile (module.js:460:26)
        at Object.Module._extensions..js (module.js:478:10)
        [... snipped for brevity ...]
    --- End of inner error
    --- Inner error #1: Error: Something else went wrong
        at Object.<anonymous> (/Users/nick/Projects/composite-error/example2.js:6:14)
        at Module._compile (module.js:460:26)
        at Object.Module._extensions..js (module.js:478:10)
        [... snipped for brevity ...]
    --- End of inner error

### Accessing inner errors

The inner errors can be accessed using the `CompositeError#innerErrors` property. This property returns an array (even
if there is only one inner error, or if there are no inner errors at all).

### Creating custom errors

You can use `CompositeError` as a base class for your own custom errors that can wrap other errors.

```javascript
var CompositeError = require('composite-error');
var util = require('util');

function MyCustomError(message, innerErrors) {
    CompositeError.call(this, message, innerErrors);
    this.name = 'MyCustomError';
}

util.inherits(MyCustomError, CompositeError);
```

## License

The MIT License (MIT)

Copyright (c) 2015 Nick Uraltsev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
