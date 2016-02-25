'use strict';

var assert = require('assert');
var winston = require('winston');
var logModule = require('../log');
var log = logModule.new();

describe('module log', function() {
    describe('managing instances', function() {
        it('module should be a default instance', function() {
            assert.strictEqual(typeof logModule.info, 'function');
        });
        it('module.new can create a new instance', function() {
            assert.strictEqual(typeof logModule.new, 'function');
            assert.strictEqual(typeof log, 'function');
            assert.strictEqual(typeof log.info, 'function');
        });
    });
    describe('winstonLogger option', function() {
        it('should log with the provided winston logger', function() {
            winston.loggers.add('category1', {
                console: {
                    level: 'silly',
                    colorize: true,
                    label: 'category one',
                },
            });
            var customLogger = log.new({
                winstonLogger: winston.loggers.get('category1'),
            });
            customLogger('test customLogger');
        });
    });
    it('should be a function', function() {
        assert.equal(typeof log, 'function');
        log('test info1');
    });
    describe('info', function() {
        it('should be a function', function() {
            assert.equal(typeof log.info, 'function');
            log.info('test info2');
        });
    });
    describe('debug', function() {
        it('should be a function', function() {
            assert.equal(typeof log.debug, 'function');
            log.info('test debug');
        });
    });
    describe('warn', function() {
        it('should be a function', function() {
            assert.equal(typeof log.warn, 'function');
        });
    });
    describe('error', function() {
        it('should be a function', function() {
            assert.equal(typeof log.error, 'function');
            log.info('test error', new Error('some error'));
        });
    });
    describe('verbose', function() {
        it('should be a function', function() {
            assert.equal(typeof log.verbose, 'function');
        });
    });
    describe('alert', function() {
        it('should be a function', function() {
            assert.equal(typeof log.alert, 'function');
        });
    });
    describe('fields', function() {
        it('should be a function', function() {
            assert.equal(typeof log.fields, 'function');
        });
    });
    describe('hash', function() {
        it('should be a function', function() {
            assert.equal(typeof log.hash, 'function');
        });
    });
});