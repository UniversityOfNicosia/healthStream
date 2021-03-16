/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { BucketDTO } from '../api/dto/googleFit.dto';
 import GChart from './GChart'
import { DataSourceName } from '../utils/enums';
import Activity from './Activity'
import Sleep from './Sleep'
import HeartRate from './HeartRate'
import { CircularProgress } from '@material-ui/core';
import Steps from './Steps'
 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
	title: string
	dataSourceName?: DataSourceName;
	// onTaskDelete: (taskId: number) => void
}

 
 
const Bucket = ({bucket, title, dataSourceName}: Props) => {
	switch (dataSourceName) {
		case DataSourceName.ACTIVITY: {
			return (
			<>
			<h1 color="primary"> {title} </h1> 
			<Activity bucket={bucket} /> 
			<GChart />	 
			</> 
			)
		}
		case DataSourceName.SLEEP: {
			return (
			<>
			<h1 color="primary"> {title} </h1> 
			<Sleep bucket={bucket} /> 
 			</> 
			)
		}
		case DataSourceName.HEART_RATE: {
			return (
			<>
			<h1 color="primary"> {title} </h1> 
			<HeartRate bucket={bucket} /> 
		 
 			</> 
			)
			 
		}	
		case DataSourceName.STEPS: {
			return (
			<>
			<h1 color="primary"> {title} </h1> 
			<Steps bucket={bucket} /> 
		 
 			</> 
			)
			 
		}		 
		default: 
		return (
			<>
			{/* <h1 color="primary"> {title} </h1> 
			<Activity bucket={bucket} /> 
			<GChart />	  */}
			</> 
			)
	}
 
}

export default Bucket