var EventEmitter = require('events').EventEmitter
var logger = new EventEmitter()

var _verboseEnabled = false
var _handleDebug = console.log.bind(console, 'debug:')
var _handleInfo = console.log.bind(console)
var _handleWarn = console.warn.bind(console, 'warn:')
var _handleError = function (err) {
	if (_verboseEnabled) {
		console.error(err.stack)
	} else if (err.hasOwnProperty('message')) {
		console.error('fatal:', err.message.toString())
	} else {
		console.error('fatal:', err)
	}
}

var _createBaseListeners = function () {
	logger.on('info', _handleInfo)
	logger.on('warn', _handleWarn)
	logger.on('error', _handleError)
}

var _destroyBaseListeners = function () {
	logger.removeListener('info', _handleInfo)
	logger.removeListener('warn', _handleWarn)
	logger.removeListener('error', _handleError)
}

// Public: log a message!
//
// Example:
//
//   logger.log('info', 'hello world')
//
logger.log = function (level, message) {
	logger.emit(level, message)
}

// create method aliases for standard log levels
Array('debug', 'info', 'warn', 'error').forEach(function (level, i) {
	logger[level] = logger.log.bind(logger, level)
})

// Public: disables output of all builtin listeners
logger.quiet = function (enabled) {
	if (enabled) {
		_destroyBaseListeners()
	} else {
		_createBaseListeners()
	}

	return this
}

// Public: enable output of 'debug' level events
logger.verbose = function (enabled) {
	_verboseEnabled = enabled

	if (_verboseEnabled) {
		logger.on('debug', _handleDebug)
	} else {
		logger.removeListener('debug', _handleDebug)
	}

	return this
}

//
// Initialize
//

// capture "TypeError: Uncaught, unspecified "error" event."
logger.on('error', function () {})
_createBaseListeners()

module.exports = logger
