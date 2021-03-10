 
import { ConnectionOptions } from "typeorm";
import appConfig from "./config";

const config: ConnectionOptions =  appConfig.ormMySQLOptions;
export = config
