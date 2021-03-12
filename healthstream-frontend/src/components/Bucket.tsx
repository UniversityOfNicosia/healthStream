/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react'
import { BucketDTO } from '../api/dto/googleFit.dto';
import Point from './Point';
import { TableContainer ,  Table , TableHead , Avatar, Card, TableBody ,TableRow,  TableCell,withStyles, Theme, createStyles, makeStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import GChart from './GChart'

 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
	title: string
	// onTaskDelete: (taskId: number) => void
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
	table: {
	  minWidth: 700,
	},
  });
 
const Bucket = ({bucket, title}: Props) => {
	const classes = useStyles();
	  
	const startTime = moment(new Date(+bucket.startTimeMillis)).format("DD-MM-YYYY")
	const endTime =  moment(new Date(+bucket.endTimeMillis)).format("DD-MM-YYYY")
	return (

		<>
		 <h1 color="primary"> {title} </h1>
 
		<TableContainer component={Paper}>
		<Table className={classes.table} aria-label="customized table">

		  <TableHead>
			<TableRow>
			  <StyledTableCell align="left"> Start Time</StyledTableCell>
			  <StyledTableCell align="left">&nbsp; End Time</StyledTableCell>
			  <StyledTableCell align="right">&nbsp; Time/Type Recorded </StyledTableCell>
			</TableRow>
		  </TableHead>
		  <TableBody>
	 
			<StyledTableRow key={0}> 
			<StyledTableCell align="left"> {startTime} </StyledTableCell>
			<StyledTableCell align="left"> {endTime}  </StyledTableCell>
			  

   	   		 { bucket.dataset !== undefined   ?  bucket.dataset.map((dataset, i)=> {
                return (
					<>
					{ dataset.point !== undefined   ?  dataset.point.map((point, i)=> {
						return (
 							<StyledTableCell align="right">	<Point point={point} />  </StyledTableCell>
							 
						);
					  })  : []
					}
					</>
                );
              })  : []
            } 
			</StyledTableRow>

		  </TableBody>
		</Table>
	  </TableContainer>


	  
	  <GChart />	

 </>
 
 
	)
}

export default Bucket