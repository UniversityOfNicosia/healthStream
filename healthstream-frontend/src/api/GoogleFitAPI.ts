import { BucketDTO, GoogleFitParameters } from "./dto/googleFit.dto"

// temporarily 
// TODO: parametirized environments
// TODO: accept user's token the correct way!

const  host = "http://localhost:3000"
const token = "ya29.a0AfH6SMC5BwtktCrQ70Cnu3aF5tAHdGGqk5P50xaDTVvpoG9GuEuUwm6bGDsGsKps82IXvEly-zOgRQOD-B9dn-euvZw0lPwxfWYuaUXbn0Q_VTjgP_edEzf3X5DBGGTU6qQtJxNFqyD0XrW9DN-fEw6FbXI5"
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

 }