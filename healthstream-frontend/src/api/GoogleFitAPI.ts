import { BucketDTO, GoogleFitParameters } from "./dto/googleFit.dto"

// temporarily 
// TODO: parametirized environments
// TODO: accept user's token the correct way!

const  host = "http://localhost:3000"
const token = "ya29.a0AfH6SMC9x-ZQNMDBDTifLC3Ez1o5Afv4JJahu9PWnm9gdnFU5oaX-eF7PEh-ubWUzBAb23m9f9Pgp9FTNEBH-5Pvma7uQryMZaUBHVt0ysPz3h5SH4IZTdH7AB62OA20YL-1yvjX0cxb9RIxGqYSLCeQQ0nh"
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