import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { GoogleFitAPI } from '../api/GoogleFitAPI';
import {  BucketDTO } from '../api/dto/googleFit.dto';
import { Button , Card} from '@material-ui/core';
import { size } from 'lodash';
 

let moment = require('moment');

interface Props {
  onCriteriaAdded: (buckets: BucketDTO[]) => void;
  onTitleSet: (title: string) => void
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
  }),
);

  const GoogleCriteria = (props: Props) => {
  const classes = useStyles();
  const [from, setFrom] = React.useState(undefined)
  const [to, setTo] = React.useState(undefined)
 

  const getActivity = async () => {
    const response = await GoogleFitAPI.getActivity({from, to})
    console.log("result from getActivity", response)
    if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Activity Data")
    } else {
        console.log("No data Found")
    }
	 
	}

  const getWorkout = async () => {
    const response = await GoogleFitAPI.getWorkOut({from, to})
		console.log("result from getWorkout", response)
    if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Work out Data")
    } else {
        console.log("No data Found")
    }
	}

  const getSleep = async () => {
    const response = await GoogleFitAPI.getSleep({from, to})
     if ( response && size(response) >0) {
      props.onCriteriaAdded(response)
      props.onTitleSet("Sleep Data")
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

  return (
    <Card> 
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
       <br/><br/><br/>     
            <Button style={{marginBottom: 10, backgroundColor: "#bb1d2c" , color:"white"}}  variant="contained"   onClick={getActivity}> Show Activity Data </Button>
            &nbsp; 
            <Button style={{marginBottom: 10 , backgroundColor: "#bb1d2c" , color:"white"}}   variant="contained"   onClick={getWorkout}> Show Work Data </Button>
            &nbsp; 
            <Button style={{marginBottom: 10 , backgroundColor: "#bb1d2c", color:"white"}}   variant="contained"   onClick={getSleep}> Show Sleep Data </Button>
            <br/> <br/><br/>
       </Card> 
    
  );
}

export default GoogleCriteria