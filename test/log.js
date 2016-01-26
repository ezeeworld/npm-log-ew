'use strict';

var assert = require('assert');
var log = require('../log');

describe('module log', function() {
  it('should be a function', function() {
    assert.equal(typeof log, 'function');
  });
  describe('info', function() {
    it('should be a function', function() {
      assert.equal(typeof log.info, 'function');
    });
  });
  describe('debug', function() {
    it('should be a function', function() {
      assert.equal(typeof log.debug, 'function');
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