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

const inputDirectories = ['/home/nathanael/dev/docmethis/parser/test'];
// const inputDirectories = ['/home/nathanael/carbonBee/indexator/indexator/server'];
// const searchPattern = ['.*.js$', '.*.jsx$', '.*.py$'];
const searchPattern = ['.*.js$', '.*.jsx$'];
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

let result = {
	directories: {},
	// restRoutes: {
	// 	path: '',
	// 	routes: {},
	// 	entries: [],
	// },
	restRoutes: [],
};

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
				let fileResult = await scanFolder(elementAbsolutePath);
				resultJson.directories.push(fileResult);
			} else if (element.match(searchRegex)) {
				let fileContent = fs.readFileSync(elementAbsolutePath);
				let parserForThisFile = fileParsers.find((fileParser) =>
					fileParser.extensions.includes(pathUtils.extname(element))
				);
				let documentation = [];
				if (parserForThisFile) {
					documentation = await parserForThisFile.parser.readFile(elementAbsolutePath);
					// documentation = await [...documentation, ...test];
					// console.log(JSON.stringify([...documentation, ...test], null, 2));
					// documentation = await documentation.concat(parserForThisFile.parser.readFile(elementAbsolutePath));
				}
				resultJson.files.push({
					path: elementAbsolutePath,
					comments: documentation,
				});
			}
		}
	}
	console.log(folderPath);
	console.log(resultJson);
	return resultJson;
}

function computeFileDoc(fileDoc) {
	for (let comment of fileDoc.comments) {
		if (comment.api && comment.api.protocol === 'http') {
			console.log(comment.api.path);
			// let splittedPath = comment.api.path.split('/');
			// let currentRoute = result.restRoutes;
			// for (let pathElement of splittedPath) {
			// 	if (currentRoute.path !== pathElement) {
			// 		if (!currentRoute.routes[pathElement]) {
			// 			currentRoute.routes[pathElement] = {
			// 				path: pathElement,
			// 				routes: {},
			// 				entries: [],
			// 			};
			// 		}
			// 		currentRoute = currentRoute.routes[pathElement];
			// 	}
			// }
			// currentRoute.entries.push({ ...comment.api, file: fileDoc.path });
			result.restRoutes.push({ ...comment.api, file: fileDoc.path });
		}
	}
}

function computeDirDoc(dirDoc) {
	for (let directory of dirDoc.directories) {
		computeDirDoc(directory);
	}
	for (let file of dirDoc.files) {
		computeFileDoc(file);
	}
}

async function initScan() {
	result.directories = await scanFolder(inputDirectories[0]);
	computeDirDoc(result.directories);
	result.restRoutes.sort((a, b) => a.path - b.path);
	fs.writeFileSync('build.json', JSON.stringify(result));
}

initScan();
