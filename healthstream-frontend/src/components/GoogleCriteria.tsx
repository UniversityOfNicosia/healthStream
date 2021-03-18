import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { GoogleFitAPI } from '../api/GoogleFitAPI';
import {  BucketDTO } from '../api/dto/googleFit.dto';
import { Button , Card} from '@material-ui/core';
import { clone, size, toUpper, upperCase } from 'lodash';
import { DataSourceName } from '../utils/enums';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import { exec } from 'node:child_process';
 
let moment = require('moment');

interface Props {
  onCriteriaAdded: (buckets: BucketDTO[]) => void;
  onTitleSet: (title: string) => void
  onDateSet: (date: any) => void
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
   const [dataSourceName, setDataSourceName] = React.useState(undefined)


  const getActivity = async (from: any) => {
    const response = await GoogleFitAPI.getActivity({from})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Activity Data")
      props.onDataSourceNameSet(DataSourceName.ACTIVITY)

    } else {
        console.log("No data Found")
    }
	 
	}

  const getHeartRate = async (from: any) => {
    const response = await GoogleFitAPI.getHeartRate({from})
      if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Heart Rate Data")
      props.onDataSourceNameSet(DataSourceName.HEART_RATE)
      

    } else {
        console.log("No data Found")
    }
	}

  const getSteps = async (from: any) => {
    const response = await GoogleFitAPI.getStepsCount({from})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Steps Count Data")
      props.onDataSourceNameSet(DataSourceName.STEPS)
      props.onDateSet(from)

    } else {
        console.log("No data Found")
    }
	}


  const getSleep = async (from: any) => {
     
    const response = await GoogleFitAPI.getSleep({from})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Sleep Data")
      props.onDataSourceNameSet(DataSourceName.SLEEP)
      props.onDateSet(from)

    } else {
        console.log("No data Found")
    }
	}

 
 

  const executeAPI = (  dataSourceName: DataSourceName, from: any) => {
        switch (dataSourceName) {
      case DataSourceName.ACTIVITY: {
        getActivity(from)
        break
      }
      case DataSourceName.HEART_RATE: {
        getHeartRate(from)
        break
      }
      case DataSourceName.SLEEP: {
         getSleep(from)
        break
      }
      case DataSourceName.STEPS: {
        getSteps(from)
        break
      }
      default: 
      return  
  };
}

const formatDate = (date: any) => {
   
   const from = moment(date).valueOf() 
    setFrom(from) 
   const value = toUpper(window.location.pathname.substring(1)) as DataSourceName
   console.log("FUCKING VALUES ",window.location.pathname.substring(1), value)

   executeAPI( value, from)
}

  return (
    <>
     
    <Card> 
      <br/>   
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label= "Date"
            type="date"
            defaultValue="2021-03-01"
            onChange={(e)=> formatDate(e.target.value)}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
      
       </form>
       <br/> 
     &nbsp; &nbsp;&nbsp;
 
       </Card> 
    </>
  );
}

export default GoogleCriteria