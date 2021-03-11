/* eslint-disable no-console */
import {NextFunction, Request, Response, CookieOptions} from 'express'
import urlParse from 'url-parse'
import queryParse from 'query-string'
import { size } from 'lodash';
import { IDataSetParams } from '../../services/googleFit';
import { DataSourceName } from '../../database/common/enums';


export const connect = async (req: Request, res: Response) => {
const {callbackUrl,userId} = req.body;
const googleFitDS = req.externalFactory.getGoogleFitService()
 const url = await googleFitDS.connect(callbackUrl, userId)
  if (url) {
    return res.status(200).send({url}).end();
  }
  return res.status(404).end();
}; 

 

export const setToken =  async (req: Request, res: Response) => {
    const queryURL = new urlParse(req.url) as any
    const code = queryParse.parse(queryURL.query).code as string

    const googleFitDS = req.externalFactory.getGoogleFitService()
    const {tokens} = await googleFitDS.authClient.getToken(code)

    if (tokens) {
        googleFitDS.authClient.setCredentials({
            access_token: tokens.access_token,
            refresh_token: tokens.access_token,
            token_type: tokens.token_type,
            id_token: tokens.id_token,
            expiry_date: tokens.expiry_date
          }); 
          
         const token = (await googleFitDS.authClient.getAccessToken()).token
         return res.status(200).send({token}).end();
    } else {
        return res.status(404).end();
    }
};

 

export const getAllDataSources = async (req: Request, res: Response) => {
     const token  = req.headers.authorization
    const googleFitDS = req.externalFactory.getGoogleFitService()
    const datasources = await googleFitDS.getAllDataSources(token)

    if ( size(datasources) >0) {
        return res.status(200).send(datasources).end();
    } else {
        return res.status(404).end();
    }
 
}; 

 
 
 /**  ACTIVITY */
 export const getActivity = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.ACTIVITY)
 }; 

 export const getBMR = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.BMR)
 }; 

 export const getCaloriesBurned = async (req: Request, res: Response) => {
      await callGoogleFitAPIService(req, res, DataSourceName.CALORIES_BURNED)
 }; 

 export const getCyclingPedalingCadence = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.CYCLING_PEDALING_CADENCE)
}; 
  
export const getCyclingPedalingCumulative = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.CYCLING_PENDALING_CUMULATIVE)
}; 

export const getHeartPoints = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.HEART_POINTS)
}; 
export const getMoveMinutes = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.MOVE_MINUTES)
}; 

export const getPower = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.POWER)
}; 

export const getStepCountCadence = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.STEP_COUNT_CADENCE)
}; 
export const getStepCountDelta = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.STEP_COUNT_DELTA)
}; 
export const getWorkOut = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.WORKOUT)
}; 
 
 /**  BODY */
export const getBodyFatPercentage = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.BODY_FAT_PERCENTAGE)
}; 
export const getHeartRate = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.HEART_RATE)
}; 
export const getHeight = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.HEIGHT)
}; 
export const getWeight = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.WEIGHT)
}; 


 /**  SLEEP */
export const getSleep = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.SLEEP)
}; 

 /**  NUTRITION */
 export const getNutrition = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.NUTRITION)
};

export const getHydration = async (req: Request, res: Response) => {
    await callGoogleFitAPIService(req, res, DataSourceName.HYDRATION)
}; 




 export const callGoogleFitAPIService = async (req: Request, res: Response, dataTypeName: DataSourceName) => {  
    const token  = req.headers.authorization
    const {from, to} = req.body
    const params : IDataSetParams = {
            token ,
            startTime: from,
            endTime: to
    }
    const result = await req.externalFactory.getGoogleFitService().getAggregateData(params, dataTypeName )

    if ( result ) { 
        console.log( " en erkete damerasssss", result)
        return res.status(200).send(result).end();
    } else {
        return res.status(404).end();
    }

 }

  