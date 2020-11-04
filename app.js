#!/usr/bin/env node

'use strict';

/**
 * @fileoverview main entry point
 *
 * @author		Nathanaël Spriet
 *
 * @copyright	CarbonBee AgTech
 */

const pathUtils = require('path');
const readline = require('readline');
const fs = require('fs');
const npmConfig = require(pathUtils.join(__dirname, 'package.json'));

let resultJson = {};

const inputDirectories = ['/home/nathanael/personnel/docmethis/test'];
// const inputDirectories = ['/home/nathanael/carbonBee/indexator/indexator/server'];
const searchPattern = ['.*.js$', '.*.jsx$', '.*.py$'];
const excludePattern = [
	'.vscode',
	'build',
	'node_modules',
	'reproduceTimeout',
	'testClusterPM2',
	'testhttp2',
	'testMerge',
	'userManual',
];

const excludeRegex = new RegExp('(' + excludePattern.join(')|(') + ')', 'i');
const searchRegex = new RegExp('(' + searchPattern.join(')|(') + ')', 'i');

const JavaScriptParser = require('./FileParsers/javascriptParser');
const PythonParser = require('./FileParsers/pythonParser');
const { parse } = require('path');

console.log('=========================================');
console.log('Doc me this!');
console.log(`Version : ${npmConfig.version}`);
console.log('=========================================');

let fileParsers = [
	{
		extensions: ['.js', '.jsx'],
		parser: new JavaScriptParser(),
	},
	{
		extensions: ['.py'],
		parser: new PythonParser(),
	},
];

async function scanFolder(folderPath) {
	let resultJson = {
		directories: [],
		files: [],
		name: pathUtils.basename(folderPath),
	};
	let currentDirElements = fs.readdirSync(folderPath);
	for (let element of currentDirElements) {
		if (!element.match(excludeRegex)) {
			let elementAbsolutePath = pathUtils.join(folderPath, element);
			let elementStats = fs.statSync(elementAbsolutePath);
			if (elementStats.isDirectory()) {
				resultJson.directories = [...resultJson.directories, scanFolder(elementAbsolutePath)];
			} else if (element.match(searchRegex)) {
				let fileContent = fs.readFileSync(elementAbsolutePath);
				let parserForThisFile = fileParsers.find((fileParser) =>
					fileParser.extensions.includes(pathUtils.extname(element))
				);
				if (parserForThisFile) {
					await parserForThisFile.parser.readFile(elementAbsolutePath);
				}
				resultJson.files.push({
					path: elementAbsolutePath,
					comments: [],
				});
			}
		}
		// console.log(element);
	}
	return resultJson;
}

console.log(JSON.stringify(scanFolder(inputDirectories[0]), null, 2));
