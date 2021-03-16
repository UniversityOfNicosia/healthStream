import { BucketDTO, GoogleFitParameters } from "./dto/googleFit.dto"

// temporarily 
// TODO: parametirized environments
// TODO: accept user's token the correct way!

const  host = "http://localhost:3000"
const token = "ya29.a0AfH6SMDwXRm4NGI8e6M3rq0J70OkkQ0QyjYEJ_RniKmSFqOXN-JbWyTV2OObgqv2laNCWA3JvksRcnzcxcG0ieyNTNfYTGhHr9yzXA0qb_tXXVMMkpiiPP99hc1zOepP7kqMbPHPauHFzgdN-Stwzkxsk1Q0"
export class GoogleFitAPI {

     public  static async connect() { 
        const response = await fetch(`${host}/api/connect`, {
            method: "GET"
        })
        const data = await response.json()
        return data
    }

    
    public static async getActivity(params: GoogleFitParameters): Promise<BucketDTO[]> { 
        const response = await fetch(`${host}/api/connect/public/activity`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
               },
               body: JSON.stringify(params)
         },
         
         )
         const bucket = await response.json() as any
         return bucket.bucket
    }

 
    public static  async getBmr(params: GoogleFitParameters): Promise<BucketDTO[]> { 
        const response = await fetch(`${host}/api/connect/public/activity/caloriesBurned`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
               },
               body: JSON.stringify(params)
        })
        const data = await response.json()  
        return data.bucket
    }

    public static async getWorkOut(params: GoogleFitParameters): Promise<BucketDTO[]> { 
        const response = await fetch(`${host}/api/connect/public/activity/workout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
               },
               body: JSON.stringify(params)
         })
        const data = await response.json()
        return data.bucket
    }

    public static async getSleep(params: GoogleFitParameters): Promise<BucketDTO[]> { 
        const response = await fetch(`${host}/api/connect/public/sleep`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
               },
               body: JSON.stringify(params)
         })
         const data = await response.json()
         return data.bucket
    }

    public static async getHeartRate(params: GoogleFitParameters): Promise<BucketDTO[]> { 
        const response = await fetch(`${host}/api/connect/public/body/heartRate`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
               },
               body: JSON.stringify(params)
         })
         const data = await response.json()
          return data.bucket
    }

    public static async getStepsCount(params: GoogleFitParameters): Promise<BucketDTO[]> { 
        const response = await fetch(`${host}/api/connect/public/activity/stepCountDelta`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token
               },
               body: JSON.stringify(params)
         })
         const data = await response.json()
          return data.bucket
    }

 }