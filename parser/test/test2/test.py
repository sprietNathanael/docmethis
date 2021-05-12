"""
@api			{get}	/api/v1/bidules/truc/filter		06. Filter
@apiDescription	Request all bidules with filter
@apiName		FilterdBidules
@apiGroup	dBidules
@apiUse		authParameters
@apiParam	{bool}		[disabled]				Whether to include disabled
@apiParam	{bool}		[system]				Whether to include system
@apiParam	{Object}	[filters]				Filter definition
@apiParam	(Filter)	{array}	status				Status of bidules. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
@apiParam	(Filter)	{array}	[biduleTypes]	Id of bidule types
@apiParam	(Filter)	{string}[updateDate_start]	Update date range start
@apiParam	(Filter)	{string}[updateDate_end]	Update date range end
@apiParam	(Filter)	{string}[date_start]		Picture date range start
@apiParam	(Filter)	{string}[date_end]			Picture date range end
@apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`

@apiSuccess	(200)		{array}		bidules	Array of all bidules
@apiUse		commonErrors
"""


        """
        @api			{put}	/api/v1/bidules/truc/filter		06. Filter
        @apiDescription	Request all bidules with filter
        @apiName		FilterdBidules
        @apiGroup	dBidules
        @apiUse		authParameters
        @apiParam	{bool}		[disabled]				Whether to include disabled
        @apiParam	{bool}		[system]				Whether to include system
        @apiParam	{Object}	[filters]				Filter definition
        @apiParam	(Filter)	{array}	status				Status of bidules. Can contain {`"selected"`,`"on-going"`,`"done"`,`"validated"`}
        @apiParam	(Filter)	{array}	[biduleTypes]	Id of bidule types
        @apiParam	(Filter)	{string}[updateDate_start]	Update date range start
        @apiParam	(Filter)	{string}[updateDate_end]	Update date range end
        @apiParam	(Filter)	{string}[date_start]		Picture date range start
        @apiParam	(Filter)	{string}[date_end]			Picture date range end
        @apiParam	(Filter)	{array}	[metas]				Metas to filter. Each entry must have the field `type` (with value `"number"`, `"multipleValues"` or `"oneValue"`). For number, use fields `value.min` and `value.max`. Else, use `value` as an array of possible meta value id, and the field `boolOperation` with `"union"` or `"intersection"`

        @apiSuccess	(200)		{array}		bidules	Array of all bidules
        @apiUse		commonErrors
        """
