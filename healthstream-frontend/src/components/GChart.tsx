import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  SplineSeries,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation } from '@devexpress/dx-react-chart';

import { sales as data  } from './data';

 
const GChart = () => {
  const test = data[2017];

	return (
		<>
       <Paper>
        <Chart
          data={test}
        >
          <ValueScale name="sale" />
          <ValueScale name="total" />

          <ArgumentAxis />
          <ValueAxis scaleName="sale" showGrid={false} showLine showTicks />
          <ValueAxis scaleName="total" position="right" showGrid={false} showLine showTicks />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />

          <SplineSeries
            name="Total Transactions"
            valueField="total"
            argumentField="month"
            scaleName="total"
          />
          <Animation />
          <Legend />
        </Chart>
      </Paper>
          
		</> 
	)
}

export default GChart