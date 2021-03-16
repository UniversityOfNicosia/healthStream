
/* eslint-disable @typescript-eslint/no-unused-expressions */
import {  BucketDTO } from '../api/dto/googleFit.dto';
import { TableContainer ,  Table , TableHead ,TableBody ,TableRow,  TableCell,withStyles, Theme, createStyles, makeStyles} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Point from './Point';

 let moment = require('moment');

interface Props {
	bucket: BucketDTO;
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

 
const Activity = ({bucket}: Props) => {
    const classes = useStyles();
	const startTime = moment(new Date(+bucket.startTimeMillis)).format("DD-MM-YYYY")
	const endTime =  moment(new Date(+bucket.endTimeMillis)).format("DD-MM-YYYY")
	return (
		<>
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

		</> 
	)
}

export default Activity