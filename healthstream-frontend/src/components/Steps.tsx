
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
    Tooltip,BarSeries,
    LineSeries,
    ZoomAndPan,
  } from '@devexpress/dx-react-chart-material-ui';
 
 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
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

  const setStepsData = (bucket: BucketDTO, dateGraph: any) => {
    const data : any[] = []
    if (bucket.dataset && size(bucket.dataset) >0 ) {
        bucket.dataset.map((dataset, i)=> {
                if (dataset.point && size(dataset.point)>0) {
                    dataset.point.map((point, i)=> {
                        if (point.value && size(point.value)>0) {
                            point.value.map((val, i)=> {  
                                const steps =  val.intVal  
                                 data.push({dateGraph, steps})
                            })
                        }   
                    })
                }
        })
    }
    return data
 }
 const Steps = ({bucket, dateFilter}: Props) => {
 
     const dateGraph = moment(dateFilter).format("DD-MMM-YYYY")
     let stepData = setStepsData(bucket, dateGraph)
     const first =  moment(dateGraph).add(1, 'days').format("DD-MMM-YYYY")
     const second =  moment(dateGraph).add(2, 'days').format("DD-MMM-YYYY")
     const third =  moment(dateGraph).add(3, 'days').format("DD-MMM-YYYY")
     const forth =  moment(dateGraph).add(4, 'days').format("DD-MMM-YYYY")
     const fifth =  moment(dateGraph).add(5, 'days').format("DD-MMM-YYYY")
     const sixth =  moment(dateGraph).add(6, 'days').format("DD-MMM-YYYY")

    stepData.push( {dateGraph: first,steps: Math.floor(Math.random() * 100) +1201})
    stepData.push( {dateGraph: second, steps: Math.floor(Math.random() * 100) +1121})
    stepData.push( {dateGraph: second, steps: Math.floor(Math.random() * 100) +1132})
    stepData.push( {dateGraph: third, steps: Math.floor(Math.random() * 100) +1175})
    stepData.push( {dateGraph: forth, steps: Math.floor(Math.random() * 100) +1122})
    stepData.push( {dateGraph: fifth, steps: Math.floor(Math.random() * 100) +1178})
    stepData.push( {dateGraph: sixth, steps: Math.floor(Math.random() * 100) +1190})

 
     console.log("stepData", stepData)
    const LabelWithThousand = Label(' ');
  	return (
        <>
            <Paper>
            <Chart
              data={stepData}
            >
          <ArgumentAxis  labelComponent={LabelWithThousand} />
          <ValueAxis  />
 

          <BarSeries
            valueField="steps"
            argumentField="dateGraph"
          />
               <ZoomAndPan />
               
          <EventTracker />
          <Tooltip />
        </Chart>
      </Paper>

		  
       

		</> 
	)
}

export default Steps