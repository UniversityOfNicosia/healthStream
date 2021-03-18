
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {  BucketDTO } from '../api/dto/googleFit.dto';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  LineSeries,
  ArgumentAxis,
  ValueAxis,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';

import { ValueScale, Stack } from '@devexpress/dx-react-chart';
import { size, snakeCase } from 'lodash';
import { SleepingType } from '../utils/enums';
 
 
 let moment = require('moment');

interface Props {
	bucket?: BucketDTO;
  dateFilter?: any
 }

 const Label = (symbol: any) => {
   return (props: any) => {
     const { text } = props;
     return (
       <ValueAxis.Label
         {...props}
         text={text + symbol} />
     );
   };
 };

 
const Sleep = ({bucket, dateFilter}: Props) => {
   const dateGraph = moment(dateFilter).format("DD-MMM-YYYY")
   console.log("dateGraph", dateGraph)

      const data: any[ ] = [
        {
          date: dateGraph,
          unknown: 0,
          awake: 0,
          sleeping: 0,
          out_of_bed: 0,
          light_sleep : 0,
          deep_sleep : 0,
          rem_sleep: 0,
      
        }

      ]
   
    if (bucket?.dataset && size(bucket.dataset) >0 ) {
        bucket.dataset.map((dataset, i)=> {
                if (dataset.point && size(dataset.point)>0) {
                    dataset.point.map((point, i)=> {
                        if (point.value && size(point.value)>0) {
                             const end = moment(+point.endTimeNanos *  Math.pow(10, -9));
                             const start = moment(+point.startTimeNanos *  Math.pow(10, -9));

                           const duration = moment.duration(end.diff(start)).asMilliseconds()
                             
                             point.value.map((val, i)=> {   
                                const sleepType =   SleepingType[val.intVal as any]
                                   if (sleepType === 'REM sleep') { 
                                    data[0].rem_sleep +=   duration
                                  }
                                  if (sleepType === 'Unknown') {
                                    data[0].unknown +=   duration
                                  }
                                  if (sleepType === 'Sleeping') {
                                    data[0].sleeping +=duration
                                  }
                                  if (sleepType ===  'Out of bed') {
                                    data[0].out_of_bed += duration
                                  }
                                  if (sleepType === 'Awake') {
                                    data[0].awake += duration
                                  }
                                  if (sleepType === 'Light sleep') {
                                    data[0].light_sleep + duration
                                  }
                                  if (sleepType ===  'Deep sleep' ) {
                                    data[0].deep_sleep +=  duration
                                  }
                             })
                        }   
                    })
                }
        })
    }
 
    const sleepData = data
    console.log("sleeping data", sleepData)
    const LabelWithThousand = Label(' Hours');
    const modifySleepDomain = (domain: any) => [domain[0], 24];
  	return ( 
		<> 
     <Paper>
        <Chart
          data={sleepData}
        >
          <ValueScale name="sleep" modifyDomain={modifySleepDomain} />
 
          <ArgumentAxis />
          <ValueAxis
            scaleName="sleep"
            labelComponent={LabelWithThousand}
          />
          

          <BarSeries
            name="unknown"
            valueField="unknown"
            argumentField="date"
            scaleName="sleep"
          />
             <BarSeries
            name="awake"
            valueField="awake"
            argumentField="date"
            scaleName="sleep"
          />
        <BarSeries
            name="sleeping"
            valueField="sleeping"
            argumentField="date"
            scaleName="sleep"
          />
          <BarSeries
            name="out_of_bed"
            valueField="out_of_bed"
            argumentField="date"
            scaleName="sleep"
          />
           
         <BarSeries
            name="light_sleep"
            valueField="light_sleep"
            argumentField="date"
            scaleName="sleep"
          /> 
             <BarSeries
            name="deep_sleep"
            valueField="deep_sleep"
            argumentField="date"
            scaleName="sleep"
          />
             <BarSeries
            name="rem_sleep"
            valueField="rem_sleep"
            argumentField="date"
            scaleName="sleep"
          />
          <Stack
            stacks={[
              { series: ['unknown', 'awake', 'sleeping', 'out_of_bed', 'light_sleep', 'deep_sleep', 'rem_sleep'] },
            ]}
          />
          <Legend />
        </Chart>
      </Paper>
      
		</> 
	)
}
 


export default Sleep