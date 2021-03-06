
export interface GoogleFitParameters {
	from?: number
 }

 

 
export interface BucketDTO {
	startTimeMillis: string
	endTimeMillis: string
	dataset?: DataSetDTO[]
}

export interface DataSetDTO {
	dataSourceId?: string
	point?: PointDTO[]
}

export interface PointDTO {
	startTimeNanos: string
	endTimeNanos: string
	dataTypeName?: string
	originDataSourceId?: string
	value?: ValueDTO[]
}

export interface ValueDTO {
	intVal?: number
	fpVal?: number
	mapVal?: MapDTO[]
}

export interface MapDTO {
	key?: string
}

 