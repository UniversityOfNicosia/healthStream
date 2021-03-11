/* eslint-disable no-console */
import {NextFunction, Request, Response, CookieOptions} from 'express'
import urlParse from 'url-parse'
import queryParse from 'query-string'
import { size } from 'lodash';


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

 

export const getSteps = async (req: Request, res: Response) => {
    let steps: any[]= []
     const token  = req.headers.authorization
     const googleFitDS = req.externalFactory.getGoogleFitService()
     const fitnessInfo = await googleFitDS.getSteps(token)
        if (fitnessInfo && size(fitnessInfo.bucket) >0 ) {
            fitnessInfo.bucket.map((bucket: any)=> {
                if( size(bucket.dataset) >0) {
                    bucket.dataset.map((dataset: any)=> { 
                        if (size(dataset.point) >0) {
                            dataset.point.map((point: any)=> {
                                if (size(point.value) >0) {
                                     point.value.map((value: any)=> {
                                        steps.push(value.intVal)
                                         
                                    })
                                }
                               
                            })
                        }
                    })
                }
            }) 
        }   
     
 

    if ( size(steps) >0) {
        return res.status(200).send(steps).end();
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



export const getSleepInfo = async (req: Request, res: Response) => {
   const token  = req.headers.authorization
   const googleFitDS = req.externalFactory.getGoogleFitService()
   const sleepInfo = await googleFitDS.getSleepInfo(token)

   //console.log(" O IPNOS MOU EINAI", sleepInfo)
   if ( sleepInfo ) {
       return res.status(200).send(sleepInfo).end();
   } else {
       return res.status(404).end();
   }

}; 


export const getSleepStages = async (req: Request, res: Response) => {
    const token  = req.headers.authorization
    const googleFitDS = req.externalFactory.getGoogleFitService()
    const sleepInfo = await googleFitDS.getSleepStages(token)
 
    console.log(" getSleepStages O IPNOS MOU EINAI", sleepInfo)
    if ( sleepInfo ) {
        return res.status(200).send(sleepInfo).end();
    } else {
        return res.status(404).end();
    }
 
 }; 

 