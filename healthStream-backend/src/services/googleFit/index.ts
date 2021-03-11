/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import axios from 'axios'
import *  as google from 'googleapis'
import { Console } from 'node:console'
import { DataSourceName } from '../../database/common/enums'
import { request } from '../../utils/common'
 
 
export interface IGooogleFitServiceConfig {
    clientId?: string
    clientSecret?: string
    redirectUri?: string
}

export interface IGoogleFitUpsertParams {
    token?: string
}
export interface IDataSetParams extends  IGoogleFitUpsertParams {
     startTime?: number
     endTime?: number
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
    
            "https://www.googleapis.com/auth/fitness.blood_glucose.read",
            "https://www.googleapis.com/auth/fitness.blood_glucose.write",
            "https://www.googleapis.com/auth/fitness.blood_pressure.read",
            "https://www.googleapis.com/auth/fitness.blood_pressure.write" ,
            "https://www.googleapis.com/auth/fitness.body.read",
            "https://www.googleapis.com/auth/fitness.body.write",
            "https://www.googleapis.com/auth/fitness.reproductive_health.read",
            "https://www.googleapis.com/auth/fitness.reproductive_health.write",
            "https://www.googleapis.com/auth/fitness.oxygen_saturation.read",
            "https://www.googleapis.com/auth/fitness.oxygen_saturation.write",
            "https://www.googleapis.com/auth/fitness.nutrition.read",
            "https://www.googleapis.com/auth/fitness.nutrition.write",
            "https://www.googleapis.com/auth/fitness.location.read",
            "https://www.googleapis.com/auth/fitness.location.write",
            "https://www.googleapis.com/auth/fitness.body_temperature.read",
            "https://www.googleapis.com/auth/fitness.body_temperature.write",
            "https://www.googleapis.com/auth/fitness.heart_rate.read",
            "https://www.googleapis.com/auth/fitness.heart_rate.write",
            "https://www.googleapis.com/auth/fitness.sleep.read",
            "https://www.googleapis.com/auth/fitness.sleep.write",
            "https://www.googleapis.com/auth/fitness.activity.write",
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
 
 
 
 

  public async getAllDataSources(token:string) { 
    try {
        const requestUrl= "https://www.googleapis.com/fitness/v1/users/me/dataSources"
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

 

  public  async getAggregateData(params: IDataSetParams, dataTypeName: DataSourceName) {
          try {
            const data = {
              "aggregateBy": [
                  {
                    "dataTypeName":  dataTypeName,
                  }
              ],
              "endTimeMillis": params.startTime,
              "startTimeMillis": params.endTime
            }
          const requestUrl = `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`
          const result = await request({
                url: requestUrl,
                method: 'POST',
                  headers: {
                  authorization: params.token,
                },
                data
                })
                if(result) {
                    return result
                }
        } catch (error) {
          console.log("the error is", error) 
        }
   }
 

}
  

 
 