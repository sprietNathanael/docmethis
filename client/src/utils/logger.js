var LOG_LEVEL = {
	error: 3,
	warning: 4,
	info: 5,
	verbose: 6,
	debug: 7,
};

/**
 * Manages logging in web console
 *
 * @class      Logger (name)
 */
class Logger {
	constructor() {
		this.display = true;
		this.level = LOG_LEVEL.debug;
	}

	/**
	 * Logs debug
	 *
	 * @param      {Object}  toLog   The object, string or other, to log
	 */
	debug = function (toLog) {
		if (this.level >= LOG_LEVEL.debug) {
			var time = new Date();
			if (typeof toLog == 'string') {
				console.debug(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [debug] ' +
						toLog,
					'color: #0000FF; background-color: #c8e2fd;'
				);
			} else {
				console.debug(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [debug] %o',
					'color: #0000FF; background-color: #c8e2fd;',
					toLog
				);
			}
		}
	};

	/**
	 * Logs informations
	 *
	 * @param      {Object}  toLog   The object, string or other, to log
	 */
	info = function (toLog) {
		if (this.level >= LOG_LEVEL.info) {
			var time = new Date();
			if (typeof toLog == 'string') {
				console.info(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [info] ' +
						toLog,
					'color: #008000; background-color: #c8fdd1;'
				);
			} else {
				console.info(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [info] %o',
					'color: #008000; background-color: #c8fdd1;',
					toLog
				);
			}
		}
	};

	/**
	 * Logs verbose
	 *
	 * @param      {Object}  toLog   The object, string or other, to log
	 */
	verbose = function (toLog) {
		if (this.level >= LOG_LEVEL.verbose) {
			var time = new Date();
			if (typeof toLog == 'string') {
				console.info(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [verbose] ' +
						toLog,
					'color: #800080; background-color: #E5CCE5;'
				);
			} else {
				console.info(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [verbose] %o',
					'color: #800080; background-color: #E5CCE5;',
					toLog
				);
			}
		}
	};

	/**
	 * Logs verbose
	 *
	 * @param      {Object}  toLog   The object, string or other, to log
	 */
	verbose2 = function (toLog) {
		if (this.level >= LOG_LEVEL.verbose) {
			var time = new Date();
			if (typeof toLog == 'string') {
				console.info(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [verbose] ' +
						toLog,
					'color: #FF00E4; background-color: #FFE3FC;'
				);
			} else {
				console.info(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [verbose] %o',
					'color: #FF00E4; background-color: #FFE3FC;',
					toLog
				);
			}
		}
	};
	/**
	 * Logs warning
	 *
	 * @param      {Object}  toLog   The object, string or other, to log
	 */
	warning = function (toLog) {
		if (this.level >= LOG_LEVEL.warning) {
			var time = new Date();
			if (typeof toLog == 'string') {
				console.warn(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [warning] ' +
						toLog,
					'color:#FFA500;'
				);
			} else {
				console.warn(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [warning] %o',
					'color:#FFA500;',
					toLog
				);
			}
		}
	};
	/**
	 * Logs error
	 *
	 * @param      {Object}  toLog   The object, string or other, to log
	 */
	error = function (toLog) {
		if (this.level >= LOG_LEVEL.error) {
			var time = new Date();
			if (typeof toLog == 'string') {
				console.error(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [error] ' +
						toLog,
					'color:#FF0000;'
				);
			} else {
				console.error(
					'%c' +
						time.getHours() +
						':' +
						time.getMinutes() +
						':' +
						time.getSeconds() +
						'.' +
						time.getMilliseconds() +
						' - [error] %o',
					'color:#FF0000;',
					toLog
				);
			}
		}
	};
}

export default Logger;
