/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import axios from 'axios'
import *  as google from 'googleapis'
import { Console } from 'node:console'
import { request } from '../../utils/common'
 
 
export interface IGooogleFitServiceConfig {
    clientId?: string
    clientSecret?: string
    redirectUri?: string
}

 
export default class GoogleFit {
  
  private readonly clientId: string
  private readonly clientSecret: string
  private readonly redirectUri: string
  
  private token: string
  private readonly oAuthClient: google.Auth.OAuth2Client

  constructor(config: IGooogleFitServiceConfig) {
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.redirectUri = config.redirectUri

    this.oAuthClient = new google.Auth.OAuth2Client( this.clientId, this.clientSecret, this.redirectUri  ) 
   }

  public get authClient():google.Common.OAuth2Client{
      return this.oAuthClient
  }

  public connect(callbackUrl?: string, userId?: any): string { 
         const scopes = [ 
           "https://www.googleapis.com/auth/fitness.sleep.read",
          "https://www.googleapis.com/auth/fitness.activity.read profile email openid"
        ]
        const url =  this.oAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            state: JSON.stringify({
                callbackUrl,
                userId
            })
        }) 
        return url 
  }
 
 
 

  // [TODO: parametirized the dates passing ]
  public async getSteps(token:string) {
       try {
        const urlForSteps= "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate"
        const result = await request({
              url: urlForSteps,
              method: 'POST',
               headers: {
                authorization: token,
              },
    
              data: {
                 "aggregateBy": [{
                      "dataSourceId":
                        "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    }],
                    "bucketByTime": { "durationMillis": 86400000 },
                    "startTimeMillis": 1614595522000,
                    "endTimeMillis": 1615113922000 
              }
             })
              if(result) {
                 return result
             }
      } catch (error) {
        console.log("the error is", error) 
      }
  }

 

  public async getAllDataSources(token:string) { 
    try {
        const requestUrl= "https://www.googleapis.com/fitness/v1/users/me/dataSources"
        const result = await request({
              url: requestUrl,
              method: 'POST',
               headers: {
                authorization: token,
              },
             })
              if(result) {
                // console.log("result ===>", result)
                 return result
             }
      } catch (error) {
        console.log("the error is", error) 
      }
  }


  public async getSleepInfo(token:string) { 
    try {
        const requestUrl = "https://www.googleapis.com/fitness/v1/users/me/sessions?startTime=2021-03-01T00:00:00.000Z&endTime=2021-03-10T23:59:59.999Z&activityType=72"
        const result = await request({
              url: requestUrl,
              method: 'GET',
               headers: {
                authorization: token,
              },
             })
              if(result) {
                // console.log("result ===>", result)
                 return result
             }
      } catch (error) {
        console.log("the error is", error) 
      }
  }


  public async getSleepStages(token:string) { 
    try {
        const requestUrl = "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate"
        const result = await request({
              url: requestUrl,
              method: 'POST',
               headers: {
                authorization: token,
              },
              
              data:   {
                "aggregateBy": [
                    {
                        "dataTypeName": "com.google.sleep.segment"
                    }
                ],
                "endTimeMillis": 1615360049000,
                "startTimeMillis": 1614582449000
            }
             })
              if(result) {
                // console.log("result ===>", result)
                 return result
             }
      } catch (error) {
        console.log("the error is", error) 
      }
  }
 

}
  

 
 