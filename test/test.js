/**
 * @api			{get}	/api/annotations/filter		06. Filter
 * @apiDescription	Request all annotations with filter
 * @apiName		FilterAnnotations
 * @apiGroup	Annotations
 *
 * @apiUse		authParameters
 * @apiParam	{bool}		[disabled]				Whether to include disabled
 * @apiParam	{bool}		[system]				Whether to include system
 * @apiParam	{Object}	[filters]				Filter definition
 *
 * @apiParam	(Filter)	{array}	status				Status of annotations. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
 * @apiParam	(Filter)	{array}	[annotationTypes]	Id of annotation types
 * @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
 * @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
 * @apiParam	(Filter)	{string}[date_start]		Picture date range start
 * @apiParam	(Filter)	{string}[date_end]			Picture date range end
 * @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`
 *
 * @apiSuccess	(200)		{array}		annotations	Array of all annotations
 * @apiUse		commonErrors
 */
