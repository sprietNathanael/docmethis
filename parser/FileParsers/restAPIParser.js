class RestAPIParser {
	constructor() {}

	parseDoclet(docletObject) {
		let res = {
			path: '',
			method: '',
			title: '',
			name: '',
			deprecated: false,
			deprecatedDescription: '',
			description: '',
			apiExample: {},
			input: {
				headers: [],
				headerExamples: [],
				urlParams: [],
				bodyParams: [],
				queryParams: [],
				paramExamples: [],
			},
			output: {
				errors: [],
				errorExamples: [],
				success: [],
				successExamples: [],
			},
			group: '',
			define: '',
			use: '',
			protocol: 'http',
			queryParam: '',
		};
		for (let tagObject of docletObject.tags) {
			if (tagObject.tagName.match(new RegExp('^api'))) {
				if (tagObject.tagName === 'api') {
					let apiRes = this.parseApi(tagObject);
					for (let param of apiRes.input.urlParams) {
						if (res.input.urlParams.find((resParam) => resParam.name !== param.name)) {
							res.input.urlParams.push(param);
						}
					}
					res = { ...res, title: apiRes.title, path: apiRes.path, method: apiRes.method };
				} else if (tagObject.tagName === 'apiDefine') {
					res = { ...res, ...this.parseDefine(tagObject) };
				} else if (tagObject.tagName === 'apiDeprecated') {
					res.deprecated = true;
					res.deprecatedDescription = this.parseGenericText(tagObject);
				} else if (tagObject.tagName === 'apiDescription') {
					res.description = this.parseGenericText(tagObject);
				} else if (tagObject.tagName === 'apiError') {
					res.output.errors.push(this.parseError(tagObject));
				} else if (tagObject.tagName === 'apiErrorExample') {
					res.ouput.errorExamples.push(this.parseExample(tagObject));
				} else if (tagObject.tagName === 'apiExample') {
					res.apiExample = this.parseExample(tagObject);
				} else if (tagObject.tagName === 'apiGroup') {
					res.group = this.parseGenericText(tagObject);
				} else if (tagObject.tagName === 'apiHeader') {
					res.input.header.push(this.parseParam(tagObject));
				} else if (tagObject.tagName === 'apiHeaderExample') {
					res.input.headerExamples.push(this.parseExample(tagObject));
				} else if (tagObject.tagName === 'apiName') {
					res.name = this.parseGenericText(tagObject);
				} else if (tagObject.tagName === 'apiParam' || tagObject.tagName === 'apiQueryParam') {
					res.input.queryParams.push(this.parseParam(tagObject));
				} else if (tagObject.tagName === 'apiUrlParam') {
					res.input.urlParams.push(this.parseParam(tagObject));
				} else if (tagObject.tagName === 'bodyParam') {
					res.input.bodyParams.push(this.parseParam(tagObject));
				} else if (tagObject.tagName === 'apiParamExample') {
					res.input.paramExamples.push(this.parseExample(tagObject));
				} else if (tagObject.tagName === 'apiSuccess') {
					res.output.success.push(this.parseSuccess(tagObject));
				} else if (tagObject.tagName === 'apiSuccessExample') {
					res.output.successExamples.push(this.parseExample(tagObject));
				} else if (tagObject.tagName === 'apiUse') {
					res.use = this.parseGenericText(tagObject);
				}
			}
		}
		res.input.urlParams = this.joinChildrenByName(res.input.urlParams);
		res.input.bodyParams = this.joinChildrenByName(res.input.bodyParams);
		res.input.queryParams = this.joinChildrenByName(res.input.queryParams);
		res.input.headers = this.joinChildrenByName(res.input.headers);
		res.output.errors = this.joinChildrenByName(res.output.errors);
		res.output.success = this.joinChildrenByName(res.output.success);
		return res;
	}

	parseApi(tag) {
		let res = {
			path: '',
			method: '',
			title: '',
			input: {
				urlParams: [],
			},
		};
		// let regexRes = new RegExp(/^\s*{([a-zA-Z]*)}\s*([\/\w-]*)\s*(.*)$/).exec(tag.content);
		let regexRes = new RegExp(/^\s*{([a-zA-Z]*)}\s*([\/:\w-]*)\s*(.*)$/).exec(tag.content);
		res.method = regexRes[1].toUpperCase();
		res.path = regexRes[2];
		res.title = regexRes[3] || '';
		let regex = new RegExp(/\/:(\w*)/g);
		let match = regex.exec(tag.content);
		while (match !== null) {
			res.input.urlParams.push({
				group: '',
				type: '',
				isArray: false,
				maxValue: null,
				minValue: null,
				minLength: null,
				maxLength: null,
				possibleValues: [],
				optional: false,
				defaultValue: null,
				name: match[1],
				description: '',
				children: [],
			});
			match = regex.exec(tag.content);
		}

		return res;
	}

	parseGenericText(tag) {
		let regexRes = new RegExp(/^\s*(.*)$/s).exec(tag.content);
		return regexRes[1];
	}

	parseError(tag) {
		let res = {
			code: 400,
			type: '',
			isArray: false,
			maxValue: null,
			minValue: null,
			minLength: null,
			maxLength: null,
			possibleValues: [],
			optional: false,
			defaultValue: null,
			name: '',
			description: '',
			children: [],
		};
		let regexRes = new RegExp(/^\s*\((\d*)\)/).exec(tag.content);
		res.code = regexRes && regexRes[1] ? parseInt(regexRes[1]) : '';
		res = {
			...res,
			...this.parseTypeField(tag),
			...this.parseNameField(tag),
		};
		regexRes = new RegExp(/^\s*(\(.*\))?\s*({\w*})?\s*(\S*)\s*(.*)$/).exec(tag.content);
		res.description = regexRes && regexRes[4] ? regexRes[4] : '';
		return res;
	}

	parseParam(tag) {
		let res = {
			group: '',
			type: '',
			isArray: false,
			maxValue: null,
			minValue: null,
			minLength: null,
			maxLength: null,
			possibleValues: [],
			optional: false,
			defaultValue: null,
			name: '',
			description: '',
			children: [],
		};
		let regexRes = new RegExp(/^\s*\(([\w-]*)\)/).exec(tag.content);
		res.group = regexRes && regexRes[1] ? regexRes[1] : '';
		res = {
			...res,
			...this.parseTypeField(tag),
			...this.parseNameField(tag),
		};
		regexRes = new RegExp(/^\s*(\([\w-]*\))?\s*({\S*})?\s*(\S*)\s*(.*)/s).exec(tag.content);
		res.description = regexRes && regexRes[4] ? regexRes[4] : '';
		return res;
	}

	parseSuccess(tag) {
		let res = {
			code: 200,
			type: '',
			isArray: false,
			maxValue: null,
			minValue: null,
			minLength: null,
			maxLength: null,
			possibleValues: [],
			optional: false,
			defaultValue: null,
			name: '',
			description: '',
			children: [],
		};
		let regexRes = new RegExp(/^\s*\((\d*)\)/).exec(tag.content);
		res.code = regexRes && regexRes[1] ? parseInt(regexRes[1]) : '';
		res = {
			...res,
			...this.parseTypeField(tag),
			...this.parseNameField(tag),
		};
		regexRes = new RegExp(/^\s*(\([\w-]*\))?\s*({\S*})?\s*(\S*)\s*(.*)/).exec(tag.content);
		res.description = regexRes && regexRes[4] ? regexRes[4] : '';
		return res;
	}

	parseExample(tag) {
		let res = {
			type: '',
			name: '',
			example: '',
		};
		res = {
			...res,
			...this.parseTypeField(tag),
		};
		let regexRes = new RegExp(/^\h*({\S*})?\h*([\V]*)?\s*\h*(.*)/s).exec(tag.content);
		res.name = regexRes && regexRes[2] ? regexRes[2] : '';
		res.example = regexRes && regexRes[3] ? regexRes[3] : '';
		return res;
	}

	parseDefine(tag) {
		let res = {
			define: '',
		};
		let regexRes = new RegExp(/^\h*([\w-]*)\h*([\w-]*)\h*(.*)/).exec(tag.content);
		res.define = regexRes && regexRes[0] ? regexRes[0] : '';
		if (regexRes[1]) {
			res.title = regexRes[1];
		}
		if (regexRes[2]) {
			res.description = regexRes[2];
		}
	}

	parseTypeField(tag) {
		let res = {
			type: '',
			isArray: false,
			maxValue: null,
			minValue: null,
			minLength: null,
			maxLength: null,
			possibleValues: [],
		};
		let regexRes = new RegExp(/^\s*(\([\w-]*\))?\s*{(\S*)}/).exec(tag.content);
		let type = regexRes && regexRes[2] ? regexRes[2] : '';
		if (type !== '') {
			res.type = type.match(new RegExp(/^\w*/)).toString();
			regexRes = new RegExp(/^.*\[\]/).exec(type);
			if (regexRes !== null) {
				res.isArray = true;
			}
			regexRes = new RegExp(/^.*=(.*)/).exec(type);
			if (regexRes !== null && regexRes[1]) {
				res.possibleValues = regexRes[1].split(',');
			}
			regexRes = new RegExp(/^.*{(\d*)\.\.(\d*)}/).exec(type);
			if (regexRes !== null) {
				if (regexRes[1]) {
					res.minLength = parseInt(regexRes[1]);
				}
				if (regexRes[2]) {
					res.maxLength = parseInt(regexRes[2]);
				}
			}
			regexRes = new RegExp(/^.*{(-?\d*)-(-?\d*)}/).exec(type);
			if (regexRes !== null) {
				if (regexRes[1]) {
					res.minValue = parseInt(regexRes[1]);
				}
				if (regexRes[2]) {
					res.maxValue = parseInt(regexRes[2]);
				}
			}
		}
		return res;
	}

	parseNameField(tag) {
		let res = {
			optional: false,
			defaultValue: null,
			name: '',
		};
		let regexRes = new RegExp(/^\s*(\([\w-]*\))?\s*({\S*})?\s*(\S*)/).exec(tag.content);
		let fieldName = regexRes && regexRes[3] ? regexRes[3] : '';
		if (fieldName !== '') {
			regexRes = new RegExp(/^\[.*\]/).exec(fieldName);
			if (regexRes !== null) {
				res.optional = true;
			}
			regexRes = new RegExp(/^\[?([\w-\.]*)\]?/).exec(fieldName);
			if (regexRes !== null && regexRes[1]) {
				res.name = regexRes[1];
			}
			regexRes = new RegExp(/^\[?[\w-\.]*=([\w\'\"-]*)\]?/).exec(fieldName);
			if (regexRes !== null && regexRes[1]) {
				res.defaultValue = regexRes[1];
			}
		}
		return res;
	}

	joinChildrenByName(params) {
		let res = [];
		params
			.sort((a, b) => a.name - b.name)
			.forEach((param) => {
				let paramNameSplitted = param.name.split('.');
				if (!paramNameSplitted[1]) {
					res.push(param);
				} else {
					let paramsToSearch = res;
					let existingParentParam = null;
					let currentParentIndex = 0;
					do {
						let currentName = paramNameSplitted[currentParentIndex];
						existingParentParam = paramsToSearch.find((paramToFind) => paramToFind.name === currentName);
						paramsToSearch = existingParentParam.children;
						currentParentIndex++;
					} while (existingParentParam && currentParentIndex <= paramNameSplitted.length - 2);
					if (existingParentParam) {
						existingParentParam.children.push({
							...param,
							name: paramNameSplitted[currentParentIndex],
						});
					}
				}
			});
		return res;
	}
}

module.exports = RestAPIParser;
