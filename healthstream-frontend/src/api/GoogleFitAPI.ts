
const  host = "http://localhost:3000/"

export class GoogleFitAPI {

     public  static async connect() { 
        const response = await fetch(`${host}/api/connect`, {
            method: "GET"
        })
        const data = await response.json()
        return data
    }

    
    public static async getActivity() { 
        const response = await fetch(`${host}/api/connect/public/activity`, {
            method: "POST"
        })
        const data = await response.json()
        return data
    }

 
    public static  async getBmr() { 
        const response = await fetch(`${host}/api/connect/public/activity/caloriesBurned`, {
            method: "POST"
        })
        const data = await response.json()
        return data
    }

    public static async getWorkOut() { 
        const response = await fetch(`${host}/api/connect/public/activity/workout`, {
            method: "POST"
         })
        const data = await response.json()
        return data
    }

}