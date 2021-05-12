const AbstractFileParser = require('./abstractFileParser');

class PythonParser extends AbstractFileParser {
	constructor() {
		super();
	}

	lineIsCommentStart(line) {
		return line.match(new RegExp('.*\\"\\"\\".*'));
	}

	lineIsCommentEnd(line) {
		return line.match(new RegExp('.*\\"\\"\\".*'));
	}

	parseCommentLine(line) {
		return line.replace(new RegExp('^( |\t)*'), '');
	}
}

module.exports = PythonParser;
