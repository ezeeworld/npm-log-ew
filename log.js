'use strict';

var util = require('util');
var winston = require('winston');
var _ = require('lodash');

var defaultOptions = {
    separator: ' ',
    logger: winston,
};

module.exports = new_();

function new_(mainOptions) {
    mainOptions = _.clone(mainOptions || {});
    _.defaultsDeep(mainOptions, defaultOptions);

    var separator = mainOptions.separator;
    var logger = mainOptions.logger;

    return _.assign(new_.bind(), {
        inspect: {
            fields: fields,
            hash: hash,
            log: inspectLog,
            error: error,
            warn: warn,
            info: info,
            verbose: verbose,
            debug: debug,
            silly: silly,
        },
    }, logger);

    function error() {
        inspectLog('error', arguments);
    }
    function warn() {
        inspectLog('warn', arguments);
    }
    function info() {
        inspectLog('info', arguments);
    }
    function verbose() {
        inspectLog('verbose', arguments);
    }
    function debug() {
        inspectLog('debug', arguments);
    }
    function silly() {
        inspectLog('silly', arguments);
    }

    function fields(object, fields, level) {
        if (typeof level != 'string') {
            level = 'info';
        }
        var s = '';
        if (util.isArray(fields))  {
            for (var i in fields)  {
                if (i > 0) {
                    s += ', ';
                }
                var field = fields[i];
                s += field + ': ' + object[field];
            }
        } else {
            var fieldKeys = Object.keys(fields);
            for (var i in fieldKeys) {
                if (i > 0) {
                    s += ', ';
                }
                var fieldKey = fieldKeys[i];
                var fieldVal = fields[fieldKey];
                s += fieldVal + ': ' + object[fieldKey];
            }
        }
        logger.log(level, s);
    };

    function hash(message, hash, options) {
        var level = 'info';
        if (typeof options == 'string') {
            level = options;
            options = {};
        }
        var s = '';
        var hashKeys = Object.keys(hash);
        for (var i in hashKeys) {
            if (i > 0) {
                s += ', ';
            }
            var fieldKey = hashKeys[i];
            var fieldVal = hash[fieldKey];
            s += fieldKey + ': ' + fieldVal;
        }
        logger.log(level, message + ' ' + s);
    };


    // PRIVATE

    function inspectLog(level, argumentList) {
        var nonConvertibleTypes = ['object', 'function'];
        var s = '';
        for (var i = 0; i < argumentList.length; i++) {
            var arg = argumentList[i];
            if (util.isArray(arg)) {
                s += inspect(arg) + separator;
            } else if (nonConvertibleTypes.indexOf(typeof arg) < 0 || arg == null) {
                s += arg + separator;
            } else if (typeof arg == 'object' && arg.hasOwnProperty('stack')) {
                s = logFlush(level, s);
                logger.log(level, arg);
                var clone = winston_clone(arg);
                s += 'inspecting: ' + inspect(clone) + separator;
            } else if (typeof arg == 'object') {
                s += inspect(arg) + separator;
            } else if (typeof arg == 'function') {
                s += ('' + arg).replace(/\s+/g, ' ').substr(0, 50) + separator;
            } else {
                s = logFlush(level, s);
                logger.log(level, arg);
            }
        }
        logFlush(level, s);
    }

    function logFlush(level, s)  {
        if (s.length > separator.length) {
            logger.log(level, s.substr(0, s.length - separator.length));
        }
        return '';
    }

    function inspect(val) {
        return util.inspect(val, {
            showHidden: false,
            colors: true,
            depth: 5,
        });
    }

    function winston_clone(obj) {
        // We only need to clone reference types (Object)
        if (obj instanceof Error) {
            return obj;
        } else if (!(obj instanceof Object)) {
            return obj;
        } else if (obj instanceof Date) {
            return obj;
        }
        var copy = {};
        for (var i in obj) {
            if (Array.isArray(obj[i])) {
                copy[i] = obj[i].slice(0);
            } else if (obj[i] instanceof Buffer) {
                copy[i] = obj[i].slice(0);
            } else if (typeof obj[i] != 'function') {
                copy[i] = obj[i] instanceof Object ? winston_clone(obj[i]) : obj[i];
            } else if (typeof obj[i] === 'function') {
                copy[i] = obj[i];
            }
        }
        return copy;
    }
};