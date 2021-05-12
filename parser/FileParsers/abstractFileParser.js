const readline = require('readline');
const fs = require('fs');
const pathUtils = require('path');

const RestAPIParser = require('./restAPIParser');

class AbstractFileParser {
	constructor() {
		this.restAPIParser = new RestAPIParser();
	}

	async readFile(absoluteFilePath) {
		let readInterface = readline.createInterface({
			input: fs.createReadStream(absoluteFilePath),
			crlfDelay: Infinity,
		});

		let res = [];
		let commentNumber = 0;
		let inComment = false;
		let currentTag = null;
		let lineNumber = 0;
		let currentDoclet = null;
		for await (const line of readInterface) {
			lineNumber++;
			if (inComment && this.lineIsCommentEnd(line)) {
				res.push(this.computeDoclet(currentDoclet));
				inComment = false;
				commentNumber++;
			} else if (this.lineIsCommentStart(line)) {
				currentDoclet = {
					lineNumber: lineNumber,
					tags: [],
				};
				inComment = true;
			} else {
				let parsedLine = this.parseCommentLine(line);
				let tag = this.parseTagLine(parsedLine);
				// tag.line = lineNumber;
				if (tag.tagName === null && currentTag) {
					currentTag.content += '\n' + tag.content;
				} else {
					if (currentTag) {
						currentDoclet.tags.push(currentTag);
						// this.computeTag(currentTag);
						// res.push(currentTag);
					}
					currentTag = tag;
				}
			}
		}
		// console.log(res);
		// console.log(`${pathUtils.basename(absoluteFilePath)} : ${commentNumber}`);
		// console.log(JSON.stringify(res, null, 2));
		return res;
	}

	lineIsCommentStart(line) {
		throw new Error('lineIsCommentStart must be implemented');
	}

	lineIsCommentEnd(line) {
		throw new Error('lineIsCommentEnd must be implemented');
	}

	parseCommentLine(line) {
		throw new Error('parseCommentLine must be implemented');
	}

	parseTagLine(line) {
		let res = {};
		res.tagName = line.match(new RegExp('^@[a-zA-Z]*'));
		res.content = line.replace(res.tagName, '');
		res.tagName = res.tagName ? res.tagName.toString().slice(1) : null;
		return res;
	}

	computeDoclet(docletObject) {
		// if (tagObject.tagName.match(new RegExp('^api'))) {
		// 	this.restAPIParser.parseTag(tagObject);
		// }
		let res = {
			lineNumber: docletObject.lineNumber,
		};
		res = { ...res, api: this.restAPIParser.parseDoclet(docletObject) };
		// for (let tagObject of docletObject.tags) {

		// 	if (tagObject.tagName.match(new RegExp('^api'))) {
		// 		this.restAPIParser.parseTag(tagObject);
		// 	}
		// }
		// console.log(`===> ${JSON.stringify(docletObject)}`);
		return res;
	}
}

module.exports = AbstractFileParser;
