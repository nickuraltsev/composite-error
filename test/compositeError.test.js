'use strict';

var CompositeError = require('../');
var should = require('should');

describe('CompositeError', function() {
    describe('#stack', function() {
        describe('when there is one inner error', function() {
            it('should contain stack traces of current error and its inner error', function() {
                var stack = usingMockStackTraceFormatter(function() {
                    var error =
                        new CompositeError('third error',
                            new CompositeError('second error',
                                new Error('first error')));
                    return error.stack;
                });
                stack.should.be.equal(
                    '<stack trace: third error>' +
                    '\n--- Inner error: <stack trace: second error>' +
                    '\n--- Inner error: <stack trace: first error>' +
                    '\n--- End of inner error' +
                    '\n--- End of inner error');
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
                stack.should.be.equal(
                    '<stack trace: third error>' +
                    '\n--- Inner error #0: <stack trace: first error>' +
                    '\n--- End of inner error' +
                    '\n--- Inner error #1: <stack trace: second error>' +
                    '\n--- End of inner error');
            });
        });
    });

    describe('#ownStack', function() {
        it('should contain stack trace of current error', function() {
            var ownStack = usingMockStackTraceFormatter(function() {
                var error = new CompositeError('second error', new Error('first error'));
                return error.ownStack;
            });
            ownStack.should.be.equal('<stack trace: second error>');
        });
    });
});

function usingMockStackTraceFormatter(func) {
    var originalStackFormatter = Error.prepareStackTrace;
    try {
        Error.prepareStackTrace = function(e, frames) {
            return '<stack trace: ' + e.message + '>'
        };
        return func();
    } finally {
        Error.prepareStackTrace = originalStackFormatter;
    }
}
