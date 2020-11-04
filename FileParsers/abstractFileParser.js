const readline = require('readline');
const fs = require('fs');
const pathUtils = require('path');

class AbstractFileParser {
	constructor() {}

	async readFile(absoluteFilePath) {
		let readInterface = readline.createInterface({
			input: fs.createReadStream(absoluteFilePath),
			crlfDelay: Infinity,
		});

		let commentNumber = 0;
		let inComment = false;
		for await (const line of readInterface) {
			if (inComment && this.lineIsCommentEnd(line)) {
				inComment = false;
				commentNumber++;
			} else if (this.lineIsCommentStart(line)) {
				inComment = true;
			}
		}
		console.log(`${pathUtils.basename(absoluteFilePath)} : ${commentNumber}`);
	}

	lineIsCommentStart(line) {
		throw new Error('lineIsCommentStart must be implemented');
	}

	lineIsCommentEnd(line) {
		throw new Error('lineIsCommentEnd must be implemented');
	}
}

module.exports = AbstractFileParser;
