# Async logging using winston

## Installation
```sh
$ npm install --save log-ew
```

## Prerequisites
See winston README: <https://github.com/winstonjs/winston>

## Usage
```js
const log = require('log-ew');

// customizing options up-front
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'somefile.log' }),
  ],
});
const log = require('log-ew')({ winstonLogger: logger });

// making an instance available to other files
const log = require('log-ew');
log.myCustomInstance = log({ winstonLogger: logger });
// freeing memory: delete log.myCustomInstance
```

### Logging
```js
// info
log('hello world');
log.info('hello world');

// log the error and inspection of the error object
log.error(err);

// other levels
log.debug();
log.warn();
log.error();
log.verbose();
log.alert();

// logging objects
log.fields({ firstName: 'John', lastName: 'Smith' }, ['firstName']); // info
log.fields({ firstName: 'John', lastName: 'Smith' }, ['firstName'], 'debug');
log.fields({ firstName: 'John', lastName: 'Smith' }, ['firstName'], { level: 'debug' });
log.hash('Hello', { firstName: 'John', lastName: 'Smith' }); // info
log.hash('Hello', { firstName: 'John', lastName: 'Smith' }, 'debug');
```

## Running tests
```sh
$ npm install --only=dev
$ npm install mocha // or npm install -g mocha
$ npm test
```