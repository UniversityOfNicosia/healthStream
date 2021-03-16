import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { GoogleFitAPI } from '../api/GoogleFitAPI';
import {  BucketDTO } from '../api/dto/googleFit.dto';
import { Button , Card} from '@material-ui/core';
import { size } from 'lodash';
import { DataSourceName } from '../utils/enums';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';

let moment = require('moment');

interface Props {
  onCriteriaAdded: (buckets: BucketDTO[]) => void;
  onTitleSet: (title: string) => void
  onDataSourceNameSet: (entry : DataSourceName) => void
	// title: string
	// onTaskDelete: (taskId: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: '',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(1),
      width: 200,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  }),
);

  const GoogleCriteria = (props: Props) => {
  const classes = useStyles();
  const [from, setFrom] = React.useState(undefined)
  const [to, setTo] = React.useState(undefined)
  const [dataSourceName, setDataSourceName] = React.useState('')


  const getActivity = async () => {
    const response = await GoogleFitAPI.getActivity({from, to})
    console.log("result from getActivity", response)
    if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Activity Data")
      props.onDataSourceNameSet(DataSourceName.ACTIVITY)

    } else {
        console.log("No data Found")
    }
	 
	}

  const getHeartRate = async () => {
    const response = await GoogleFitAPI.getHeartRate({from, to})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Heart Rate Data")
      props.onDataSourceNameSet(DataSourceName.HEART_RATE)
      

    } else {
        console.log("No data Found")
    }
	}

  const getSteps = async () => {
    const response = await GoogleFitAPI.getStepsCount({from, to})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Steps Count Data")
      props.onDataSourceNameSet(DataSourceName.STEPS)

    } else {
        console.log("No data Found")
    }
	}


  const getSleep = async () => {
    const response = await GoogleFitAPI.getSleep({from, to})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Sleep Data")
      props.onDataSourceNameSet(DataSourceName.SLEEP)

    } else {
        console.log("No data Found")
    }
	}

  const formatFromDate = (date: any) => {
    const from = moment(date).valueOf()
     setFrom(from)
  }
  const formatToDate = (date: any) => {
    const to = moment(date).valueOf() 
    setTo(to)
  }

  const handleChange = (event: React.ChangeEvent<{ name?: any; value?: any }>) => {
    const name = event.target.name
    const value = event.target.value as DataSourceName
    setDataSourceName(value);
    switch (value) {
      case DataSourceName.ACTIVITY: {
        getActivity()
        break
      }
      case DataSourceName.HEART_RATE: {
        getHeartRate()
        break
      }
      case DataSourceName.SLEEP: {
        getSleep()
        break
      }
      case DataSourceName.STEPS: {
        getSteps()
        break
      }
      default: 
      return  
  };
}

  return (
    <Card> 
      <br/> 
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label= "From"
        type="date"
         defaultValue="2021-03-01"
        onChange={(e)=> formatFromDate(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
        <TextField
        id="date"
        label= "To"
        type="date"
        defaultValue="2021-03-02"
        onChange={(e)=> formatToDate(e.target.value)}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }} 
      />
       </form>
       <br/> 
        &nbsp; &nbsp;&nbsp;
       &nbsp; &nbsp;&nbsp;    
          <FormControl   className={classes.formControl}>
              <InputLabel htmlFor="age-native-required">  Options</InputLabel>
              <Select
                  native
                  value={dataSourceName}
                  onChange={handleChange}
                  style={{padding: 20}}
                  name="dataSourceName"
                    inputProps={{
                      id: 'age-native-required',
                    }}
                >
                <option aria-label="None" value="" />
                <option value={DataSourceName.ACTIVITY}>Activity</option>
                <option value={DataSourceName.HEART_RATE}>Heart Rate</option>
                <option value={DataSourceName.SLEEP}>Sleep Data</option>
                <option value={DataSourceName.STEPS}>Steps</option>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
       </Card> 
    
  );
}

export default GoogleCriteria