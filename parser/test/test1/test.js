/**
 * @api			{get}	/api/v1/machin/truc/filter		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}    [updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}    [updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}    [date_start]		Picture date range start
 * @apiParam	(Filter)	{string}    [date_end]			Picture date range end
 * @apiParam	(Filter2)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 * Ceci est un test !
 * Oui un test
 *
 * @apiError  (group)	{type}	field	description
 * @apiError {type}	field	description
 * @apiError field	description
 * @apiError field
 * @apiError (group)	field	description
 * @apiError (group)	field
 * @apiError (group)	{type}	field
 *
 * @apiParam    (test)	{type}	fieldName1	This is a description
 * @apiParam    {type}	fieldName2 This is a description
 * @apiParam    fieldName3 This is a description
 * @apiParam    {type} fieldName4
 * @apiParam    fieldName5
 * @apiParam    {type[]} fieldName6
 * @apiParam    {type{..5}} fieldName7
 * @apiParam    {type{2..5}} fieldName8
 * @apiParam    {type{2..}} fieldName9
 * @apiParam    {type[]{..5}} fieldName10
 * @apiParam    {type[]{2..}} fieldName11
 * @apiParam    {type[]{2..5}} fieldName12
 * @apiParam    {type{100-999}} fieldName13
 * @apiParam    {type="test","machin"} fieldName14
 * @apiParam    {type=1,2,3} fieldName15
 * @apiParam    (test)	{type}	[fieldName16]	This is a description
 * @apiParam    (test)	{type}	fieldName16.test	This is a description
 * @apiParam    (test)	{type}	fieldName16.test.machin	This is a description
 * @apiParam    (test)	{type}	[fieldName16.test.truc]	This is a description
 * @apiParam    (test)	{type}	fieldName17='truc'	This is a description
 * @apiParam    (test)	{type}	fieldName18=1	This is a description
 * @apiParam    (test)	{type}	[fieldName19=1]	This is a description
 * @apiParam    (test)	{type}	[fieldName20='test']	This is a description
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */

/**
 * @api			{post}	/api/v1/machin/truc/filter/machin		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */

/**
 * @api			{delete}	/api/v1/machin/truc/filter/machin/:truc/:bidule		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiUrlParam	{number}	truc				    Whatever
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */

/**
 * @api			{get}	/api/v1/machin/truc/filter/machin/:test/bla		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiUrlParam	{number}	truc				    Whatever
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */

/**
 * @api			{get}	/api/v1/machin/truc/filter/machin/:test/blou		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiUrlParam	{number}	truc				    Whatever
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */

/**
 * @api			{get}	/api/v1/missions		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */

/**
 * @api			{get}	/api/v1/missions/filter		06. Filter
 * @apiDescription	Request all machin with filter
 * @apiName		FilterMachins
 * @apiGroup	Machins
 *
 * @apiUse		authParameters
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of machin. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[machinTypes]	Id of machin types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		machin	Array of all machin
 * @apiUse		commonErrors
 */
