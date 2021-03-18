
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
  import { ValueScale, Stack } from '@devexpress/dx-react-chart';

 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
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
 
  const setHeartRateData = (bucket: BucketDTO) => {
    const data : any[] = []
    if (bucket.dataset && size(bucket.dataset) >0 ) {
        bucket.dataset.map((dataset, i)=> {
                if (dataset.point && size(dataset.point)>0) {
                    dataset.point.map((point, i)=> {
                        if (point.value && size(point.value)>0) {
               
                        //  const end = moment(+point.endTimeNanos *  Math.pow(10, -9));
                        //  const i = moment(+end).format("HH:mm:ss")
                            point.value.map((val, i)=> {  
                                const units =  val.fpVal  
                                const hours = (i +1) * 8
                                data.push({hours, units})
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
    const LabelWithThousand = Label('  H');
    const modifySleepDomain = (domain: any) => [domain[0], 24];

      console.log("zsfsfsdfsdfdf", heartData)
  	return (
        <>
           
		 
        <Paper>
        <Chart data={heartData}>
        <ValueScale name="hours" modifyDomain={modifySleepDomain} />
 
          <ArgumentAxis  labelComponent={LabelWithThousand}/>
          <ValueAxis  /> 
          <LineSeries valueField="units" argumentField="hours" />
          <ZoomAndPan />
        </Chart>
      </Paper> 
       

		</> 
	)
}

export default HeartRate