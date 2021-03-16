
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {  BucketDTO } from '../api/dto/googleFit.dto';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { useState } from 'react';
import { EventTracker } from '@devexpress/dx-react-chart';
import { size } from 'lodash';
import { SleepingType } from '../utils/enums';

 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
 }
 
 
 
const Sleep = ({bucket}: Props) => {
    const data : any[] = []
    if (bucket.dataset && size(bucket.dataset) >0 ) {
        bucket.dataset.map((dataset, i)=> {
                if (dataset.point && size(dataset.point)>0) {
                    dataset.point.map((point, i)=> {
                        if (point.value && size(point.value)>0) {
                     
                            const differenceInMilliSeconds = (+point.endTimeNanos) - (+point.startTimeNanos)
                            const seconds = moment.utc(moment.duration(differenceInMilliSeconds,"s").asMilliseconds()).format("HH:mm:ss")

                             
                            point.value.map((val, i)=> {  
                                const sleepType =   SleepingType[val.intVal as any]
                                data.push({seconds, sleepType})
                            })
                        }   
                    })
                }
        })
    }
 
    const sleepData = data
  
 	return (
		<>
        <Paper>
        <Chart
          data={sleepData}
        >
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="seconds"
            argumentField="sleepType"
          />
    
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>

		</> 
	)
}

export default Sleep