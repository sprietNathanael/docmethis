let extensionMapping = { '.js': 'javascript', '.py': 'python' };

let typeLinks = {
	javascript: {
		undefined: {
			name: 'Undefined',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Undefined',
		},
		bool: {
			name: 'Boolean',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
		},
		boolean: {
			name: 'Boolean',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
		},
		number: {
			name: 'Number',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number',
		},
		string: {
			name: 'String',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String',
		},
		str: {
			name: 'String',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String',
		},
		bigint: {
			name: 'BigInt',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt',
		},
		symbol: {
			name: 'Symbol',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol',
		},
		object: {
			name: 'Object',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object',
		},
		function: {
			name: 'Function',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function',
		},
		func: {
			name: 'Function',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function',
		},
		null: {
			name: 'Null',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null',
		},
		error: {
			name: 'Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error',
		},
		evalerror: {
			name: 'Eval Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/EvalError',
		},
		internalerror: {
			name: 'Internal Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/InternalError',
		},
		rangeerror: {
			name: 'Range Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError',
		},
		referenceerror: {
			name: 'Reference Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError',
		},
		syntaxerror: {
			name: 'Syntax Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError',
		},
		typeerror: {
			name: 'Type Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError',
		},
		urierror: {
			name: 'URI Error',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/URIError',
		},
		math: {
			name: 'Math',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Math',
		},
		date: {
			name: 'Date',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date',
		},
		map: {
			name: 'Map',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map',
		},
		set: {
			name: 'Set',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set',
		},
		promise: {
			name: 'Promise',
			link: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise',
		},
	},
	python: {
		string: {
			name: 'String',
			link: 'https://docs.python.org/3/library/string.html',
		},
		str: {
			name: 'String',
			link: 'https://docs.python.org/3/library/string.html',
		},
		integer: {
			name: 'Integer',
			link: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex',
		},
		int: {
			name: 'Integer',
			link: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex',
		},
		float: {
			name: 'Float',
			link: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex',
		},
		complex: {
			name: 'Complex',
			link: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex',
		},
		list: {
			name: 'List',
			link: 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists',
		},
		tuple: {
			name: 'Tuple',
			link: 'https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences',
		},
		dict: {
			name: 'Dictionnary',
			link: 'https://docs.python.org/tutorial/datastructures.html#dictionaries',
		},
		dictionnary: {
			name: 'Dictionnary',
			link: 'https://docs.python.org/tutorial/datastructures.html#dictionaries',
		},
		set: {
			name: 'Set',
			link: 'https://docs.python.org/3/tutorial/datastructures.html#sets',
		},
		bool: {
			name: 'Boolean',
			link: 'https://docs.python.org/3/library/stdtypes.html#truth-value-testing',
		},
		boolean: {
			name: 'Boolean',
			link: 'https://docs.python.org/3/library/stdtypes.html#truth-value-testing',
		},
	},
};

module.exports = {
	typeLinks,
	extensionMapping,
};
