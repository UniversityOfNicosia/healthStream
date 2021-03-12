
import { Box } from '@material-ui/core';
import {  PointDTO } from '../api/dto/googleFit.dto';
 import {ActivityType} from '../utils/enums'
interface Props {
	point: PointDTO;
 }

const Point = ({point}: Props) => {
	return (
		<>
       <div>  
	   	 		{  point.value !== undefined   ?  point.value.map((val)=> {
							return (
                                <Box color="primary.main">   { ActivityType[val.intVal as any] }  </Box>
							);
						}) 
                        : []
				 }

		</div> 
		</> 
	)
}

export default Point