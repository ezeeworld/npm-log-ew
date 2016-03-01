# Winston logger wrapper with added inspection functions

## Installation
```sh
$ npm install --save log-ew
```

## Prerequisites
See winston README: <https://github.com/winstonjs/winston>

## Usage
```js
// require default logger (created with default options)
const log = require('log-ew');

// override default options
const log = require('log-ew')({ logger: console });

// making a logger available to other files
const log = require('log-ew');
log.consoleLogger = log({ logger: console });
```

## Options

### logger
Defaults to `require('winston')`

```js
const log = require('log-ew');

// the log.loggers function comes from winston
log.loggers.add('logger1', {
    console: {
        colorize: true,
        label: 'logger 1',
    },
});
var logger1 = log({
    // logger.log must be a function(level, arguments…)
    logger: log.loggers.get('logger1'),
});
```

### Logging
```js
const log = require('log-ew');

// every property of winston is available by default
log.info('version', log.version);

// inspect arguments in more detail, this can be useful for errors
log.inspect.log(level, arguments…);
log.inspect.error(arguments…);
log.inspect.warn(arguments…);
log.inspect.info(arguments…);
log.inspect.verbose(arguments…);
log.inspect.debug(arguments…);
log.inspect.silly(arguments…);

// logging objects
log.inspect.fields({ firstName: 'John', lastName: 'Smith' }, ['firstName']); // info
log.inspect.fields({ firstName: 'John', lastName: 'Smith' }, ['firstName'], 'debug');
log.inspect.fields({ firstName: 'John', lastName: 'Smith' }, ['firstName'], { level: 'debug' });
log.inspect.hash('Hello', { firstName: 'John', lastName: 'Smith' }); // info
log.inspect.hash('Hello', { firstName: 'John', lastName: 'Smith' }, 'debug');
```

## Running tests
```sh
$ npm install
$ npm test
```