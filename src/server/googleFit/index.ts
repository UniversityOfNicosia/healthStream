import express from "express";
import { useTransaction } from "../transaction";
import * as googleFitController from "./controller";

const googleFitMiddleWare: express.Application = express();

googleFitMiddleWare.use("/api/*", useTransaction);

googleFitMiddleWare.get("/api/connect", googleFitController.connect);
//call back url 
googleFitMiddleWare.get("/api/connect/oauth2callback", googleFitController.setToken);
 

googleFitMiddleWare.get("/api/connect/steps", googleFitController.getSteps);
googleFitMiddleWare.get("/api/connect/datasources", googleFitController.getAllDataSources);

 
googleFitMiddleWare.get("/api/connect/sleepInfo", googleFitController.getSleepInfo);

export default googleFitMiddleWare;
