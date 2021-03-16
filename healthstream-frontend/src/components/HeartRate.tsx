
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {  BucketDTO } from '../api/dto/googleFit.dto';
import Paper from '@material-ui/core/Paper';
 import { EventTracker } from '@devexpress/dx-react-chart';
import { size } from 'lodash';
import React from 'react';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    Tooltip,
    LineSeries,
    ZoomAndPan,
  } from '@devexpress/dx-react-chart-material-ui';
import { CircularProgress } from '@material-ui/core';
 
 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
 }
 
  const setHeartRateData = (bucket: BucketDTO) => {
    const data : any[] = []
    if (bucket.dataset && size(bucket.dataset) >0 ) {
        bucket.dataset.map((dataset, i)=> {
                if (dataset.point && size(dataset.point)>0) {
                    dataset.point.map((point, i)=> {
                        if (point.value && size(point.value)>0) {
                     
                           const differenceInMilliSeconds = (+point.endTimeNanos) - (+point.startTimeNanos)
                       
                            const  duration_ = moment.utc(moment.duration(differenceInMilliSeconds, "s").asMilliseconds()).format("HH:mm:ss")
                            point.value.map((val, i)=> {  
                                const units =  val.fpVal  
                                data.push({duration_, units})
                            })
                        }   
                    })
                }
        })
    }
    return data
 }
 
const HeartRate = ({bucket}: Props) => {
    const heartData = setHeartRateData(bucket)
  	return (
        <>
           
		 
        <Paper>
        <Chart data={heartData}>
          <ArgumentAxis />
          <ValueAxis /> 
          <LineSeries valueField="units" argumentField="duration_" />
          <ZoomAndPan />
        </Chart>
      </Paper> 
       

		</> 
	)
}

export default HeartRate