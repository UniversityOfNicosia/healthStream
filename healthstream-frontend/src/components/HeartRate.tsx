
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
               

                            point.value.map((val, i)=> {  
                                const units =  val.fpVal  

                                data.push({ units})
                            })
                        }   
                    })
                }
        })
    }
    return data
 }
 
const HeartRate = ({bucket}: Props) => {
  const hours = ["average" ,"max","min", ]
    const heartData = setHeartRateData(bucket)
    const LabelWithThousand = Label('  ');
    const modifySleepDomain = (domain: any) => [domain[0], 24];

    heartData.map((e, i)=> {
        e.hours = hours[i]
    })
 

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