import express from "express";
import { useTransaction } from "../transaction";
import * as googleFitController from "./controller";

const googleFitMiddleWare: express.Application = express();

googleFitMiddleWare.use("/api/*", useTransaction);

googleFitMiddleWare.get("/api/connect", googleFitController.connect);
//call back url 
googleFitMiddleWare.get("/api/connect/oauth2callback", googleFitController.setToken);
 

// googleFitMiddleWare.get("/api/connect/steps", googleFitController.getSteps);
googleFitMiddleWare.get("/api/connect/datasources", googleFitController.getAllDataSources);

 
// googleFitMiddleWare.get("/api/connect/sleepInfo", googleFitController.getSleepInfo);
// googleFitMiddleWare.post("/api/connect/sleepStages", googleFitController.getSleepStages);


/** PUCLIC ACTITIY GROUP  */

/**  ACTIVITY */
googleFitMiddleWare.post("/api/connect/public/activity", googleFitController.getActivity);
googleFitMiddleWare.post("/api/connect/public/activity/bmr", googleFitController.getBMR);
googleFitMiddleWare.post("/api/connect/public/activity/caloriesBurned", googleFitController.getCaloriesBurned);
googleFitMiddleWare.post("/api/connect/public/activity/cyclingPedalingCadence", googleFitController.getCyclingPedalingCadence);
googleFitMiddleWare.post("/api/connect/public/activity/cyclingPedalingCumulative", googleFitController.getCyclingPedalingCumulative);
googleFitMiddleWare.post("/api/connect/public/activity/heartPoints", googleFitController.getHeartPoints);
googleFitMiddleWare.post("/api/connect/public/activity/moveMinutes", googleFitController.getMoveMinutes);
googleFitMiddleWare.post("/api/connect/public/activity/power", googleFitController.getPower);
googleFitMiddleWare.post("/api/connect/public/activity/stepCountCadence", googleFitController.getStepCountCadence);
googleFitMiddleWare.post("/api/connect/public/activity/stepCountDelta", googleFitController.getStepCountDelta);
googleFitMiddleWare.post("/api/connect/public/activity/workout", googleFitController.getWorkOut);

 /**  BODY */
googleFitMiddleWare.post("/api/connect/public/body/bodyFatPercentage", googleFitController.getBodyFatPercentage);
googleFitMiddleWare.post("/api/connect/public/body/heartRate", googleFitController.getHeartRate);
googleFitMiddleWare.post("/api/connect/public/body/height", googleFitController.getHeight);
googleFitMiddleWare.post("/api/connect/public/body/weight", googleFitController.getWeight);


 /**  SLEEP */
googleFitMiddleWare.post("/api/connect/public/sleep", googleFitController.getSleep);

 /**  NUTRITION */
googleFitMiddleWare.get("/api/connect/public/nutrition", googleFitController.getNutrition);
googleFitMiddleWare.get("/api/connect/public/nutrition/hydration", googleFitController.getHydration);
  

 /**  BODY */
 //googleFitMiddleWare.get("/api/connect/public/body/fatPercentage", googleFitController.getFatPercentage);
// googleFitMiddleWare.get("/api/connect/public/body/heartRate", googleFitController.getHeartRate);
 //googleFitMiddleWare.get("/api/connect/public/body/height", googleFitController.getHeight);
// googleFitMiddleWare.get("/api/connect/public/body/weight", googleFitController.getWeight);

 
// pass body with {from, to}
// googleFitMiddleWare.post("/api/connect/public/activity/bmr", googleFitController.getBMR);

//googleFitMiddleWare.get("/api/connect/public/activity/caloriesBurned", googleFitController.getCaloriesBurned);
//googleFitMiddleWare.get("/api/connect/public/activity/cyclingPedalingCadence", googleFitController.getCyclingPedalingCadence);
//googleFitMiddleWare.get("/api/connect/public/activity/cyclingPedalingCumulative", googleFitController.getCyclingPedalingCumulative);
//googleFitMiddleWare.get("/api/connect/public/activity/heartPoints", googleFitController.getHeartPoints);
//googleFitMiddleWare.get("/api/connect/public/activity/movePoints", googleFitController.getMovePoints);

 
 /**  BODY */
 //googleFitMiddleWare.get("/api/connect/public/body/fatPercentage", googleFitController.getFatPercentage);
// googleFitMiddleWare.get("/api/connect/public/body/heartRate", googleFitController.getHeartRate);
 //googleFitMiddleWare.get("/api/connect/public/body/height", googleFitController.getHeight);
// googleFitMiddleWare.get("/api/connect/public/body/weight", googleFitController.getWeight);

 
 
/**  LOCATION */
//googleFitMiddleWare.get("/api/connect/public/location/rpm", googleFitController.getRpm);
//googleFitMiddleWare.get("/api/connect/public/location/wheelRevolutionCumulative", googleFitController.getWheelRevolutionCumulative);
//googleFitMiddleWare.get("/api/connect/public/location/distance", googleFitController.getDistance);
//googleFitMiddleWare.get(" /api/connect/public/location/speed", googleFitController.getSpeed);
 

 
 

/** HEALTH  */
// googleFitMiddleWare.get("/api/connect/public/health/glucose", googleFitController.getGlucose);
// googleFitMiddleWare.get(" /api/connect/public/health/bloodPressure", googleFitController.getBloodPressure);
// googleFitMiddleWare.get("/api/connect/public/health/bodyTemperature", googleFitController.getBodyTemperature);
// googleFitMiddleWare.get("/api/connect/public/health/cervicalmucus", googleFitController.getCervicalMucus);
// googleFitMiddleWare.get(" /api/connect/public/health/cervicalPosition", googleFitController.getCervicalPosition);
// googleFitMiddleWare.get("/api/connect/public/health/menstruation", googleFitController.getMenstruation);
// googleFitMiddleWare.get("/api/connect/public/health/ovulationTest", googleFitController.getOvulationTest);
// googleFitMiddleWare.get("/api/connect/public/health/oxygensaturation", googleFitController.getOxygenSaturation);
// googleFitMiddleWare.get("/api/connect/public/health/vaginalSpotting", googleFitController.getVaginalSpotting);
 
 
 export default googleFitMiddleWare;
