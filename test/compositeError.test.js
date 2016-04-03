'use strict';

var CompositeError = require('../');
require('should');

describe('CompositeError', function() {
  describe('#stack', function() {
    describe('when there is one inner error', function() {
      it('should contain stack traces of current error and its inner error', function() {
        var stack = usingMockStackTraceFormatter(function() {
          var error =
            new CompositeError('third error',
              new CompositeError('second error',
                new Error('first error')
              )
            );
          return error.stack;
        });
        stack.should.equal(
          '<stack trace: third error>' +
          '\n--- Inner error: <stack trace: second error>' +
          '\n--- Inner error: <stack trace: first error>' +
          '\n--- End of inner error' +
          '\n--- End of inner error'
        );
      });
    });

    describe('when there is more than one inner error', function() {
      it('should contain stack traces of current error and all its inner errors', function() {
        var stack = usingMockStackTraceFormatter(function() {
          var error = new CompositeError('third error', [
            new Error('first error'),
            new Error('second error')
          ]);
          return error.stack;
        });
        stack.should.equal(
          '<stack trace: third error>' +
          '\n--- Inner error #0: <stack trace: first error>' +
          '\n--- End of inner error' +
          '\n--- Inner error #1: <stack trace: second error>' +
          '\n--- End of inner error'
        );
      });
    });

    describe('when there are no inner errors', function() {
      it('should contain stack trace of current error', function() {
        var stack = usingMockStackTraceFormatter(function() {
          var error = new CompositeError('error');
          return error.stack;
        });
        stack.should.equal('<stack trace: error>');
      });
    });
  });

  describe('#innerErrors', function() {
    describe('when there is one inner error', function() {
      it('should contain array of one inner error', function() {
        var innerError = new Error('inner error');
        var error = new CompositeError('error', innerError);
        error.innerErrors.should.eql([innerError]);
      });
    });

    describe('when there is more than one inner error', function() {
      it('should contain array of all inner errors', function() {
        var innerError1 = new Error('inner error 1');
        var innerError2 = new Error('inner error 2');
        var error = new CompositeError('error', [innerError1, innerError2]);
        error.innerErrors.should.eql([innerError1, innerError2]);
      });
    });

    describe('when there are no inner errors', function() {
      it('should contain empty array', function() {
        var error = new CompositeError('error');
        error.innerErrors.should.be.empty.Array;
      });
    });
  });

  describe('#ownStack', function() {
    it('should contain stack trace of current error', function() {
      var ownStack = usingMockStackTraceFormatter(function() {
        var error = new CompositeError('second error', new Error('first error'));
        return error.ownStack;
      });
      ownStack.should.equal('<stack trace: second error>');
    });
  });
});

function usingMockStackTraceFormatter(func) {
  var originalStackFormatter = Error.prepareStackTrace;
  try {
    Error.prepareStackTrace = function(e) {
      return '<stack trace: ' + e.message + '>'
    };
    return func();
  } finally {
    Error.prepareStackTrace = originalStackFormatter;
  }
}
