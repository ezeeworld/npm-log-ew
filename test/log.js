'use strict';

var assert = require('assert');
var logModule = require('../log');
var log = logModule();

describe('module log', function() {
    describe('managing instances', function() {
        it('module should be a default instance', function() {
            assert.strictEqual(typeof logModule.info, 'function');
        });
        it('module can create a new instance', function() {
            assert.strictEqual(typeof logModule, 'function');
            assert.strictEqual(typeof log, 'function');
            assert.strictEqual(typeof log.info, 'function');
        });
    });
    describe('logger option', function() {
        it('should log with the provided logger', function() {
            log.loggers.add('category1', {
                console: {
                    level: 'silly',
                    colorize: true,
                    label: 'category one',
                },
            });
            var customLogger = log({

                // must implement logger.log(level, arguments…)
                logger: log.loggers.get('category1'),
            });
            customLogger.info('test custom logger: custom winston logger');
            var customLogger2 = log({

                // must implement logger.log(level, arguments…)
                logger: console,
            });
            customLogger2.inspect.warn('test custom logger: console');
        });
    });
    describe('info', function() {
        it('should not raise an error when called', function() {
            assert.equal(typeof log.info, 'function');
            log.info('test log.info');
        });
    });
    describe('inspect.info', function() {
        it('should not raise an error when called', function() {
            assert.equal(typeof log.inspect.info, 'function');
            log.inspect.info('test log.inspect.info2');
        });
    });
});