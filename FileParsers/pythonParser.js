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
}

module.exports = PythonParser;
