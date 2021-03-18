
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
                     
                          //   //const start_ = moment(+point.startTimeNanos *  Math.pow(10, -9));
                          //  // const end_ = moment(+point.endTimeNanos *  Math.pow(10, -9));
                          //   //const differenceInMilliSeconds = (+end_) - (+start_)
                          //  // console.log("differenceInMilliSeconds", differenceInMilliSeconds)
                          // //  const  duration_ = moment.utc(moment.duration(differenceInMilliSeconds, "s").asMilliseconds()).format("ss")
 
                          //   const end = moment(+point.endTimeNanos *  Math.pow(10, -9));
                          //   const duration_end = moment(+end).format("H::mm:ss::SSS")

                          //   const start = moment(+point.startTimeNanos *  Math.pow(10, -9));
                          //   //const duration_start = moment(+start).format("H::mm:ss::SSS")
                            
                            
                           
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
 //Wednesday, 3 March 2021 06:48:00 G
 //Wednesday, 3 March 2021 06:48:15 G
const Steps = ({bucket, dateFilter}: Props) => {
  console.log("dateFilter", dateFilter)

     const dateGraph = moment(dateFilter).format("DD-MMM-YYYY")
     const stepData = setStepsData(bucket, dateGraph)
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